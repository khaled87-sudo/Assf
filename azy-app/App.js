import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Linking,
  I18nManager,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

// فرض الاتجاه من اليمين لليسار (عربي) — يحتاج إعادة تشغيل التطبيق أول مرة داخل Expo Go
try {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} catch (e) {}

// ---- ألوان الهوية ----
const COLORS = {
  navy: "#152238",
  navyLight: "#22355A",
  gold: "#C9A24B",
  sage: "#7C9885",
  paper: "#F6F3EC",
  paperDeep: "#EDE7D8",
  ink: "#1F2A37",
  inkSoft: "#5B6472",
};

// ---- بيانات تجريبية ----
const UNIVERSITIES = [
  { name: "جامعة مانشستر", country: "بريطانيا", match: "معتمدة ومتميزة", logo: "M" },
  { name: "جامعة تورنتو", country: "كندا", match: "معتمدة", logo: "T" },
  { name: "جامعة ملبورن", country: "أستراليا", match: "معتمدة ومتميزة", logo: "M" },
];

const DOCS = [
  { name: "جواز السفر", status: "جاهز", icon: "🛂" },
  { name: "الشهادة الثانوية", status: "جاهز", icon: "🎓" },
  { name: "كشف الدرجات", status: "ناقص", icon: "📄" },
  { name: "خطاب القبول", status: "قيد الانتظار", icon: "✉️" },
];

const STEPS = [
  { title: "تقديم الطلب للجامعة", done: true },
  { title: "استلام القبول الجامعي", done: true },
  { title: "تجهيز ملف الابتعاث", done: false, active: true },
  { title: "مراجعة الملحق الثقافي", done: false },
  { title: "إصدار التأشيرة", done: false },
];

// ⚙️ روابط الإحالة — بدّلها بروابطك الفعلية بعد الموافقة من British Council / IDP
const AFFILIATE_LINKS = {
  britishCouncil: "https://www.britishcouncil.com.kw/en/exam/ielts/book-test",
  idp: "https://ielts.idp.com/kuwait",
  amideast: "https://www.amideast.org/kuwait/take-a-test/individuals/toefl",
};

const ENGLISH_TESTS = [
  { test: "IELTS", provider: "British Council", url: AFFILIATE_LINKS.britishCouncil },
  { test: "IELTS", provider: "IDP IELTS Kuwait", url: AFFILIATE_LINKS.idp },
  { test: "TOEFL iBT", provider: "Amideast Kuwait", url: AFFILIATE_LINKS.amideast },
];

const TRAINING_COURSES = [
  { name: "أ. فهد العتيبي", type: "IELTS", price: "٣٥ د.ك", rating: "٤.٨" },
  { name: "معهد سبيك أب", type: "TOEFL", price: "٤٠ د.ك", rating: "٤.٦" },
];

const MUNADI_LIST = [
  { name: "أبو فهد للمعاملات", services: "تصديق شهادات · استلام قرار الابتعاث", price: "١٥ د.ك" },
  { name: "مكتب اليسر للمعاملات", services: "متابعة ملف كامل بالوزارة", price: "٢٥ د.ك" },
];

const NOTIFICATIONS = [
  {
    icon: "📄",
    title: "باقي 5 أيام على تسليم كشف الدرجات",
    from: "admissions@warwick.ac.uk",
    snippet: "Please submit your official transcript no later than 12 August.",
  },
  {
    icon: "🛂",
    title: "تأشيرتك الدراسية تنتهي خلال 45 يوم",
    from: "visa-support@warwick.ac.uk",
    snippet: "We recommend starting your renewal application 8 weeks in advance.",
  },
];

const COMMUNITY_PEERS = [
  { name: "عبدالعزيز.", major: "هندسة كهربائية", year: "السنة الثانية" },
  { name: "دانة.", major: "إدارة أعمال", year: "السنة الأولى" },
];

// ---- عناصر مشتركة ----
function StatusPill({ status }) {
  const map = {
    "جاهز": { bg: "#E7EFE8", fg: COLORS.sage },
    "ناقص": { bg: "#FBEAEA", fg: "#B4453F" },
    "قيد الانتظار": { bg: "#FBF3E3", fg: COLORS.gold },
  };
  const s = map[status] || map["قيد الانتظار"];
  return (
    <View style={[styles.pill, { backgroundColor: s.bg }]}>
      <Text style={{ color: s.fg, fontSize: 11, fontWeight: "600" }}>{status}</Text>
    </View>
  );
}

function TopBar({ title, subtitle, onBack }) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarRow}>
        {onBack ? (
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row-reverse", alignItems: "center", gap: 6 }}>
            <Ionicons name="sparkles" size={13} color={COLORS.gold} />
            <Text style={{ color: COLORS.gold, fontSize: 11 }}>مسارك الدراسي</Text>
          </View>
        )}
        <View style={styles.avatar}>
          <Text style={{ color: "#fff", fontSize: 12, fontWeight: "700" }}>خ</Text>
        </View>
      </View>
      <Text style={styles.topBarTitle}>{title}</Text>
      {subtitle ? <Text style={styles.topBarSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function BottomNav({ tab, setTab }) {
  const items = [
    { id: "home", label: "الرئيسية", icon: "home-outline" },
    { id: "unis", label: "الجامعات", icon: "search-outline" },
    { id: "docs", label: "مستنداتي", icon: "document-text-outline" },
    { id: "track", label: "متابعة", icon: "business-outline" },
  ];
  return (
    <View style={styles.bottomNav}>
      {items.map((it) => {
        const active = tab === it.id;
        return (
          <TouchableOpacity key={it.id} onPress={() => setTab(it.id)} style={{ alignItems: "center", gap: 3 }}>
            <Ionicons name={it.icon} size={20} color={active ? COLORS.navy : "#B7BEC7"} />
            <Text style={{ fontSize: 10, color: active ? COLORS.navy : "#B7BEC7", fontWeight: active ? "700" : "400" }}>
              {it.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function ActionTile({ emoji, title, sub, onPress, badge }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tile}>
      {badge ? (
        <View style={styles.badge}>
          <Text style={{ color: "#fff", fontSize: 9, fontWeight: "700" }}>{badge}</Text>
        </View>
      ) : null}
      <View style={styles.tileIcon}>
        <Text style={{ fontSize: 15 }}>{emoji}</Text>
      </View>
      <Text style={{ fontSize: 12.5, fontWeight: "600", color: COLORS.ink }}>{title}</Text>
      <Text style={{ fontSize: 10, color: COLORS.inkSoft, marginTop: 2 }}>{sub}</Text>
    </TouchableOpacity>
  );
}

// ---- الشاشات ----
function HomeScreen({ setTab, open }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TopBar title="هلا خالد 👋" subtitle="ملفك مكتمل بنسبة 65%" />
      <View style={styles.section}>
        <View style={styles.card}>
          <View>
            <Text style={{ fontSize: 11, color: COLORS.inkSoft }}>الخطوة الحالية</Text>
            <Text style={{ fontSize: 13, fontWeight: "700", color: COLORS.ink, marginTop: 2 }}>
              تجهيز ملف الابتعاث
            </Text>
          </View>
          <TouchableOpacity onPress={() => setTab("track")} style={styles.smallBtnNavy}>
            <Text style={{ color: "#fff", fontSize: 11, fontWeight: "600" }}>متابعة</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => open("scan")} style={styles.primaryAction}>
          <View style={styles.primaryIcon}>
            <Ionicons name="camera" size={20} color={COLORS.navy} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: 13, fontWeight: "700" }}>صوّر مستند</Text>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>تحويل تلقائي إلى PDF</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>خدمات إضافية</Text>
        <View style={styles.grid}>
          <ActionTile emoji="🎓" title="IELTS / TOEFL" sub="روابط رسمية" onPress={() => open("tests")} />
          <ActionTile emoji="🎧" title="التدريب" sub="دورات ومدربين" onPress={() => open("training")} />
          <ActionTile emoji="🏛️" title="منادي الوزارة" sub="ينجز معاملتك" onPress={() => open("munadi")} />
          <ActionTile emoji="✉️" title="بريد الجامعة" sub="مساعد خالد" onPress={() => open("email")} />
          <ActionTile emoji="👥" title="مجتمع الطلاب" sub="طلاب جامعتك" onPress={() => open("community")} />
          <ActionTile emoji="🔔" title="الإشعارات" sub="تذكيرات" badge={2} onPress={() => open("notif")} />
        </View>
      </View>
    </ScrollView>
  );
}

function UniListScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TopBar title="دليل الجامعات" subtitle="معتمدة من الملحق الثقافي الكويتي" />
      <View style={styles.section}>
        {UNIVERSITIES.map((u) => (
          <View key={u.name} style={styles.listCard}>
            <View style={styles.avatarSq}>
              <Text style={{ fontWeight: "700", color: COLORS.navy }}>{u.logo}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: "600", color: COLORS.ink }}>{u.name}</Text>
              <Text style={{ fontSize: 11, color: COLORS.inkSoft, marginTop: 2 }}>{u.country}</Text>
            </View>
            <StatusPill status="جاهز" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function DocsScreen({ open }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TopBar title="مستنداتي" subtitle="PDF و DOCX جاهزة دائماً" />
      <View style={styles.section}>
        {DOCS.map((d) => (
          <View key={d.name} style={styles.listCard}>
            <Text style={{ fontSize: 18 }}>{d.icon}</Text>
            <Text style={{ flex: 1, fontSize: 13, fontWeight: "600", color: COLORS.ink }}>{d.name}</Text>
            <StatusPill status={d.status} />
          </View>
        ))}
        <TouchableOpacity onPress={() => open("scan")} style={styles.dashedBtn}>
          <Ionicons name="cloud-upload-outline" size={20} color={COLORS.navyLight} />
          <Text style={{ fontSize: 12, color: COLORS.navyLight, fontWeight: "600", marginTop: 6 }}>
            أضف مستند جديد بالكاميرا
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function TrackScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TopBar title="متابعة الملف" subtitle="خطوة بخطوة حتى وصولك" />
      <View style={styles.section}>
        {STEPS.map((s, i) => (
          <View key={s.title} style={{ flexDirection: "row-reverse", marginBottom: 14 }}>
            <View
              style={[
                styles.stepDot,
                { backgroundColor: s.done ? COLORS.sage : s.active ? COLORS.gold : "#E3DFD3" },
              ]}
            >
              <Text style={{ fontSize: 10, fontWeight: "700", color: s.done || s.active ? "#fff" : "#9A9384" }}>
                {i + 1}
              </Text>
            </View>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: s.active ? "700" : "500", color: s.active ? COLORS.ink : "#A6ADB6" }}>
                {s.title}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function ScanModal({ close }) {
  const [stage, setStage] = useState("camera");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = React.useRef(null);

  const capture = async () => {
    if (!cameraRef.current) return;
    try {
      setStage("processing");
      await cameraRef.current.takePictureAsync({ quality: 0.6 });
      // ملاحظة: التحويل الفعلي إلى PDF يحتاج مكتبة مثل expo-print لاحقاً
      setTimeout(() => setStage("done"), 700);
    } catch (e) {
      setStage("camera");
    }
  };

  return (
    <View style={styles.overlayDark}>
      <TouchableOpacity onPress={close} style={{ padding: 20 }}>
        <Ionicons name="close" size={22} color="rgba(255,255,255,0.7)" />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {stage === "camera" && !permission?.granted && (
          <>
            <Ionicons name="camera-outline" size={40} color="rgba(255,255,255,0.5)" />
            <Text style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 12, textAlign: "center", paddingHorizontal: 30 }}>
              نحتاج إذن الوصول للكاميرا لتصوير مستنداتك
            </Text>
            <TouchableOpacity onPress={requestPermission} style={styles.goldBtnFull}>
              <Text style={{ color: COLORS.navy, fontWeight: "700" }}>السماح باستخدام الكاميرا</Text>
            </TouchableOpacity>
          </>
        )}
        {stage === "camera" && permission?.granted && (
          <>
            <View style={styles.scanFrame}>
              <CameraView ref={cameraRef} style={{ flex: 1, borderRadius: 14 }} facing="back" />
            </View>
            <TouchableOpacity onPress={capture} style={styles.shutterBtn}>
              <Ionicons name="camera" size={24} color={COLORS.navy} />
            </TouchableOpacity>
          </>
        )}
        {stage === "processing" && <ActivityIndicator color={COLORS.gold} size="large" />}
        {stage === "done" && (
          <>
            <Ionicons name="checkmark-circle" size={48} color={COLORS.sage} />
            <Text style={{ color: "#fff", marginTop: 12, fontWeight: "700" }}>تم الحفظ بصيغة PDF</Text>
          </>
        )}
      </View>
    </View>
  );
}

function TestsScreen({ close }) {
  return (
    <View style={styles.overlay}>
      <TopBar title="اختبارات اللغة" subtitle="روابط رسمية معتمدة" onBack={close} />
      <ScrollView style={styles.section}>
        {ENGLISH_TESTS.map((t, i) => (
          <TouchableOpacity key={i} onPress={() => Linking.openURL(t.url)} style={styles.listCard}>
            <Text style={{ flex: 1, fontSize: 13, fontWeight: "600", color: COLORS.ink }}>
              {t.test} — {t.provider}
            </Text>
            <Ionicons name="chevron-back" size={16} color={COLORS.gold} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function TrainingScreen({ close }) {
  return (
    <View style={styles.overlay}>
      <TopBar title="التدريب على IELTS/TOEFL" subtitle="دورات من مدربين ومعاهد" onBack={close} />
      <ScrollView style={styles.section}>
        {TRAINING_COURSES.map((c, i) => (
          <View key={i} style={styles.listCard}>
            <Text style={{ flex: 1, fontSize: 13, fontWeight: "600", color: COLORS.ink }}>
              {c.name} ({c.type})
            </Text>
            <Text style={{ fontWeight: "700", color: COLORS.navy, fontSize: 12 }}>{c.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function MunadiScreen({ close }) {
  return (
    <View style={styles.overlay}>
      <TopBar title="منادي معاملات الوزارة" subtitle="ينجز معاملتك بدل ما تروح" onBack={close} />
      <ScrollView style={styles.section}>
        {MUNADI_LIST.map((m, i) => (
          <View key={i} style={styles.listCard}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: "600", color: COLORS.ink }}>{m.name}</Text>
              <Text style={{ fontSize: 11, color: COLORS.inkSoft, marginTop: 2 }}>{m.services}</Text>
            </View>
            <Text style={{ fontWeight: "700", color: COLORS.navy, fontSize: 12 }}>{m.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function EmailAssistantScreen({ close }) {
  const [connected, setConnected] = useState(false);
  const [draft, setDraft] = useState("");
  const [showDraft, setShowDraft] = useState(false);

  if (!connected) {
    return (
      <View style={styles.overlay}>
        <TopBar title="بريد الجامعة" subtitle="اربط إيميلك الجامعي" onBack={close} />
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: COLORS.ink, marginTop: 20 }}>
            اربط إيميلك الجامعي
          </Text>
          <TouchableOpacity onPress={() => setConnected(true)} style={styles.primaryBtnFull}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>ربط الإيميل</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.overlay}>
      <TopBar title="بريد الجامعة" subtitle="متصل" onBack={close} />
      <ScrollView style={styles.section}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="اكتب اللي تبي تقوله بالعربي..."
          multiline
          style={styles.textArea}
        />
        <TouchableOpacity onPress={() => setShowDraft(true)} style={styles.goldBtnFull}>
          <Text style={{ color: COLORS.navy, fontWeight: "700" }}>✨ اطلب من خالد يصيغها</Text>
        </TouchableOpacity>
        {showDraft && (
          <View style={styles.listCard}>
            <Text style={{ fontSize: 11, color: COLORS.inkSoft, textAlign: "left" }}>
              Dear Admissions Office, I am writing to kindly request a one-week extension...
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function CommunityScreen({ close }) {
  const [verified, setVerified] = useState(false);
  if (!verified) {
    return (
      <View style={styles.overlay}>
        <TopBar title="مجتمع الطلاب" subtitle="يحتاج تفعيل" onBack={close} />
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: COLORS.inkSoft, textAlign: "center" }}>
            فعّلها بإيميلك الجامعي الرسمي فقط
          </Text>
          <TouchableOpacity onPress={() => setVerified(true)} style={styles.primaryBtnFull}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>تحقق وفعّل</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.overlay}>
      <TopBar title="طلاب جامعتك" subtitle="مفعّل" onBack={close} />
      <ScrollView style={styles.section}>
        {COMMUNITY_PEERS.map((p, i) => (
          <View key={i} style={styles.listCard}>
            <Text style={{ flex: 1, fontSize: 13, fontWeight: "600", color: COLORS.ink }}>{p.name}</Text>
            <Text style={{ fontSize: 11, color: COLORS.inkSoft }}>
              {p.major} · {p.year}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function NotificationsScreen({ close }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <View style={styles.overlay}>
      <TopBar title="الإشعارات" subtitle="مبنية على إيميلاتك الفعلية" onBack={close} />
      <ScrollView style={styles.section}>
        {NOTIFICATIONS.map((n, i) => (
          <TouchableOpacity key={i} onPress={() => setOpenIdx(openIdx === i ? null : i)} style={styles.listCard}>
            <Text style={{ fontSize: 16 }}>{n.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12.5, fontWeight: "600", color: COLORS.ink }}>{n.title}</Text>
              {openIdx === i && (
                <Text style={{ fontSize: 10.5, color: COLORS.inkSoft, marginTop: 6, textAlign: "left" }}>
                  {n.from}: "{n.snippet}"
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// ---- التطبيق الرئيسي ----
export default function App() {
  const [tab, setTab] = useState("home");
  const [modal, setModal] = useState(null); // scan | tests | training | munadi | email | community | notif

  const open = (name) => setModal(name);
  const close = () => setModal(null);

  const screens = {
    home: <HomeScreen setTab={setTab} open={open} />,
    unis: <UniListScreen />,
    docs: <DocsScreen open={open} />,
    track: <TrackScreen />,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.paper }}>
      <StatusBar style="light" />
      <View style={{ flex: 1 }}>{screens[tab]}</View>
      <BottomNav tab={tab} setTab={setTab} />

      <Modal visible={!!modal} animationType="slide" onRequestClose={close}>
        {modal === "scan" && <ScanModal close={close} />}
        {modal === "tests" && <TestsScreen close={close} />}
        {modal === "training" && <TrainingScreen close={close} />}
        {modal === "munadi" && <MunadiScreen close={close} />}
        {modal === "email" && <EmailAssistantScreen close={close} />}
        {modal === "community" && <CommunityScreen close={close} />}
        {modal === "notif" && <NotificationsScreen close={close} />}
      </Modal>
    </SafeAreaView>
  );
}

// ---- الأنماط ----
const styles = StyleSheet.create({
  topBar: { backgroundColor: COLORS.navy, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 22, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  topBarRow: { flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center" },
  avatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.1)", alignItems: "center", justifyContent: "center" },
  topBarTitle: { color: "#fff", fontSize: 19, fontWeight: "700", marginTop: 10, textAlign: "right" },
  topBarSubtitle: { color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 4, textAlign: "right" },
  section: { paddingHorizontal: 18, paddingTop: 16, paddingBottom: 20 },
  sectionLabel: { fontSize: 13, fontWeight: "700", color: COLORS.ink, marginTop: 18, marginBottom: 10, textAlign: "right" },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 14, flexDirection: "row-reverse", justifyContent: "space-between", alignItems: "center", marginTop: -20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  smallBtnNavy: { backgroundColor: COLORS.navy, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20 },
  primaryAction: { backgroundColor: COLORS.navy, borderRadius: 16, padding: 14, flexDirection: "row-reverse", alignItems: "center", gap: 12, marginTop: 16 },
  primaryIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: COLORS.gold, alignItems: "center", justifyContent: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-between" },
  tile: { width: "48%", backgroundColor: "#fff", borderRadius: 16, padding: 12, borderWidth: 1, borderColor: COLORS.paperDeep, alignItems: "flex-end", position: "relative" },
  tileIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: COLORS.paperDeep, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  badge: { position: "absolute", top: -6, left: -6, width: 18, height: 18, borderRadius: 9, backgroundColor: "#B4453F", alignItems: "center", justifyContent: "center", zIndex: 2 },
  listCard: { backgroundColor: "#fff", borderRadius: 16, padding: 14, flexDirection: "row-reverse", alignItems: "center", gap: 10, marginBottom: 10, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  avatarSq: { width: 42, height: 42, borderRadius: 12, backgroundColor: COLORS.paperDeep, alignItems: "center", justifyContent: "center" },
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  dashedBtn: { borderWidth: 2, borderColor: COLORS.paperDeep, borderStyle: "dashed", borderRadius: 16, paddingVertical: 20, alignItems: "center" },
  stepDot: { width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center" },
  bottomNav: { flexDirection: "row-reverse", justifyContent: "space-around", paddingVertical: 12, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: COLORS.paperDeep },
  overlay: { flex: 1, backgroundColor: COLORS.paper },
  overlayDark: { flex: 1, backgroundColor: "#0D1524" },
  scanFrame: { width: 240, height: 320, borderWidth: 2, borderColor: COLORS.gold, borderStyle: "dashed", borderRadius: 16, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  shutterBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.gold, alignItems: "center", justifyContent: "center", marginTop: 30 },
  primaryBtnFull: { backgroundColor: COLORS.navy, paddingVertical: 14, borderRadius: 14, alignItems: "center", marginTop: 16, width: "100%" },
  goldBtnFull: { backgroundColor: COLORS.gold, paddingVertical: 12, borderRadius: 12, alignItems: "center", marginTop: 10 },
  textArea: { backgroundColor: "#fff", borderRadius: 14, padding: 12, minHeight: 80, textAlign: "right", fontSize: 12.5, color: COLORS.ink, textAlignVertical: "top" },
});
