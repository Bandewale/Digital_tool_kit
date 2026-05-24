/* =============================================
   AgriReadiness – script.js
   MULTILINGUAL ENHANCEMENT
   Languages: English, Telugu, Hindi, Tamil
   
   Architecture:
   - TRANSLATIONS object holds all UI strings
   - switchLanguage(code) swaps every data-i18n element
   - advisoryLang dropdown sends language to backend
   - Header pill + Section 1 dropdown stay in sync
   ============================================= */

// -----------------------------------------------
// ⚙️ CONFIG
// -----------------------------------------------
const API_BASE_URL = "https://agrireadiness-backend.onrender.com";

// -----------------------------------------------
// TRANSLATIONS
// All UI strings for English, Telugu, Hindi, Tamil
// -----------------------------------------------
const TRANSLATIONS = {

  en: {
    tagline:           "Digital Toolkit for Agricultural Extension",
    arch_collection:   "Collection",
    arch_analysis:     "Analysis",
    arch_advisory:     "Advisory",
    arch_feedback:     "Feedback",
    step1_label:       "Farmer Profile",
    step2_label:       "Extension Readiness",
    step3_label:       "Context & Constraints",

    // Section 1
    s1_tag:            "Step 1 — Collection",
    s1_title:          "Farmer Profile",
    s1_desc:           "Basic identification and prior digital engagement level.",
    s1_name_label:     "Respondent Name",
    s1_name_placeholder: "Enter full name",
    s1_name_error:     "Please enter your name.",
    s1_exp_label:      "Prior Digital Engagement Level",
    s1_exp_hint:       "Self-assessed exposure to digital devices and services",
    s1_exp_error:      "Please select an engagement level.",
    exp_low:           "Low",
    exp_low_desc:      "Minimal or no digital tool usage",
    exp_med:           "Medium",
    exp_med_desc:      "Occasional use of mobile/apps",
    exp_high:          "High",
    exp_high_desc:     "Regular and confident digital use",
    s1_lang_label:     "Preferred Advisory Language",
    s1_lang_hint:      "The AI-generated advisory will be produced in this language",

    // Section 2
    s2_tag:            "Step 2 — Collection",
    s2_title:          "Agricultural Digital Extension Readiness",
    s2_desc:           "Rate current capacity across four digital extension readiness dimensions.",
    s2_res_label:      "Digital Infrastructure Access",
    s2_res_hint:       "Availability of devices, internet, and agricultural digital services",
    s2_gui_label:      "Extension Support Availability",
    s2_gui_hint:       "Access to agricultural extension agents, advisors, or peer networks",
    s2_pln_label:      "Farm Management Planning Capacity",
    s2_pln_hint:       "Ability to plan farming operations using structured or digital approaches",
    s2_con_label:      "Technology Adoption Consistency",
    s2_con_hint:       "Regularity of engaging with new digital tools or extension recommendations",
    select_default:    "-- Select --",
    select_error:      "Please select a value.",
    res_1: "1 – No access to digital infrastructure",
    res_2: "2 – Very limited access (shared/intermittent)",
    res_3: "3 – Moderate access with connectivity gaps",
    res_4: "4 – Reliable access to key digital services",
    res_5: "5 – Full and consistent digital infrastructure access",
    gui_1: "1 – No extension support available",
    gui_2: "2 – Occasional informal peer advice only",
    gui_3: "3 – Periodic contact with extension services",
    gui_4: "4 – Regular access to structured extension support",
    gui_5: "5 – Strong, multi-channel extension support network",
    pln_1: "1 – Entirely reactive; no structured planning",
    pln_2: "2 – Informal seasonal planning, experience-based",
    pln_3: "3 – Basic crop-cycle planning with occasional records",
    pln_4: "4 – Structured planning with some digital documentation",
    pln_5: "5 – Data-informed, systematic farm management planning",
    con_1: "1 – Rarely adopts or discontinues tools quickly",
    con_2: "2 – Tries occasionally, adoption is inconsistent",
    con_3: "3 – Moderate adoption with some sustained use",
    con_4: "4 – Consistent adoption with minor drop-offs",
    con_5: "5 – Sustained and disciplined technology adoption",

    // Section 3
    s3_tag:            "Step 3 — Collection",
    s3_title:          "Contextual Factors & Constraints",
    s3_desc:           "These inputs shape the adaptive advisory output and explainability.",
    s3_con_label:      "Primary Adoption Barrier",
    s3_con_hint:       "Key structural or contextual constraint affecting digital extension uptake",
    s3_use_label:      "Perceived Usability of Digital Tools",
    s3_use_hint:       "Self-assessed ease of using agricultural apps or extension platforms",
    s3_fb_label:       "Open-Ended Context Response",
    s3_fb_hint:        "Challenges, aspirations, or additional context",
    s3_fb_placeholder: "Describe your farming context, challenges, or digital adoption experience…",
    con_financial:     "Financial limitations",
    con_tech:          "Limited device or connectivity access",
    con_skill:         "Digital literacy or skill gap",
    con_infra:         "Poor rural infrastructure",
    con_market:        "Lack of market or supply-chain connectivity",
    con_lang:          "Language or literacy barrier",
    con_none:          "No significant barrier identified",
    use_veryeasy:      "Very easy – tools are accessible and intuitive",
    use_easy:          "Easy – can use with minor difficulty",
    use_neutral:       "Neutral – mixed experience",
    use_difficult:     "Difficult – requires significant support",
    use_verydifficult: "Very difficult – inaccessible without assistance",

    // Buttons
    btn_proceed:        "Proceed →",
    btn_back:           "← Back",
    btn_submit:         "Generate Advisory Report →",
    btn_tts:            "🔊 Read Advisory",
    btn_new:            "↺ New Assessment",
    btn_save:           "↓ Save Report",
    btn_submit_feedback:"Submit Feedback →",

    // Loading
    loading_title:     "Generating Advisory Report…",
    loading_sub:       "Analysing responses · Applying readiness model · Generating contextual advisory",

    // Result cards
    report_label:      "DIGITAL EXTENSION READINESS REPORT",
    report_title:      "Assessment Report",
    card_a_title:      "Assessment Summary",
    card_b_title:      "Readiness Interpretation",
    card_c_title:      "Key Constraints Identified",
    card_d_title:      "Adaptive Advisory Output",
    card_e_title:      "Why This Advisory Was Generated",
    card_f_title:      "Suggested Next Steps",
    card_g_title:      "Extension Support Recommendation",
    card_h_title:      "Advisory Feedback",
    sum_exp:           "Digital Experience",
    sum_barrier:       "Primary Barrier",
    sum_usability:     "Tool Usability",
    sum_lang:          "Advisory Language",
    score_label:       "Composite Readiness Score",
    score_none:        "None",
    score_low:         "Low",
    score_med:         "Medium",
    score_high:        "High",
    xai_label:         "Explainability",
    hitl_label:        "Human-in-the-Loop",
    feedback_stage:    "Feedback Stage",
    fb_rate_label:     "Rate the relevance of this advisory",
    fb_not_rated:      "Not rated",
    fb_impl_label:     "Would you implement these recommendations?",
    fb_yes:            "Yes",
    fb_partial:        "Partially",
    fb_no:             "No",
    fb_support_label:  "What support would help implementation?",
    fb_support_placeholder: "Describe what assistance, training, or resources would help…",
    fb_confirmed:      "Feedback recorded. This input contributes to the adaptive feedback loop.",
    optional:          "(optional)",
    footer:            "AgriReadiness © 2025 · Digital Toolkit for Agricultural Extension · PhD Credit Seminar Prototype",

    // Readiness interpretations
    interp_low:   "Score indicates early-stage digital readiness. The respondent demonstrates limited engagement with digital infrastructure and extension systems. Foundational interventions including device access support, basic digital literacy, and agent-assisted onboarding are indicated.",
    interp_med:   "Score indicates transitional digital readiness. The respondent has partial engagement with digital tools and extension services. Targeted capacity-building interventions and structured extension follow-up are recommended.",
    interp_high:  "Score indicates established digital readiness. The respondent demonstrates consistent infrastructure access, extension engagement, and technology adoption. Advisory focus should shift to advanced applications and peer-facilitation roles.",

    // XAI factor labels
    xai_score:        "Score",
    xai_infra:        "Infrastructure",
    xai_extension:    "Extension Support",
    xai_constraint:   "Constraint",
    xai_usability:    "Usability",
    xai_openresponse: "Open Response",
    xai_language:     "Language",
  },

  // ─────────────────────────────────────────────
  te: {  // TELUGU
    tagline:           "వ్యవసాయ విస్తరణ కోసం డిజిటల్ సాధన కిట్",
    arch_collection:   "సేకరణ",
    arch_analysis:     "విశ్లేషణ",
    arch_advisory:     "సలహా",
    arch_feedback:     "అభిప్రాయం",
    step1_label:       "రైతు వివరాలు",
    step2_label:       "విస్తరణ సంసిద్ధత",
    step3_label:       "సందర్భం & అడ్డంకులు",

    s1_tag:            "దశ 1 — సేకరణ",
    s1_title:          "రైతు వివరాలు",
    s1_desc:           "ప్రాథమిక గుర్తింపు మరియు డిజిటల్ అనుభవ స్థాయి.",
    s1_name_label:     "పేరు",
    s1_name_placeholder: "పూర్తి పేరు నమోదు చేయండి",
    s1_name_error:     "దయచేసి మీ పేరు నమోదు చేయండి.",
    s1_exp_label:      "డిజిటల్ అనుభవ స్థాయి",
    s1_exp_hint:       "డిజిటల్ పరికరాలు మరియు సేవలపై స్వీయ అంచనా",
    s1_exp_error:      "దయచేసి స్థాయిని ఎంచుకోండి.",
    exp_low:           "తక్కువ",
    exp_low_desc:      "డిజిటల్ సాధనాల వాడకం తక్కువ లేదా శూన్యం",
    exp_med:           "మధ్యమ",
    exp_med_desc:      "మొబైల్/యాప్‌లను అప్పుడప్పుడు వాడతారు",
    exp_high:          "అధికం",
    exp_high_desc:     "నిరంతర మరియు నమ్మకమైన డిజిటల్ వినియోగం",
    s1_lang_label:     "సలహా భాష ప్రాధాన్యత",
    s1_lang_hint:      "AI సృష్టించిన సలహా ఈ భాషలో అందించబడుతుంది",

    s2_tag:            "దశ 2 — సేకరణ",
    s2_title:          "వ్యవసాయ డిజిటల్ విస్తరణ సంసిద్ధత",
    s2_desc:           "నాలుగు కొలతలలో ప్రస్తుత సామర్థ్యాన్ని రేట్ చేయండి.",
    s2_res_label:      "డిజిటల్ మౌలిక సదుపాయాల ప్రాప్తి",
    s2_res_hint:       "పరికరాలు, ఇంటర్నెట్ మరియు వ్యవసాయ డిజిటల్ సేవల లభ్యత",
    s2_gui_label:      "విస్తరణ మద్దతు లభ్యత",
    s2_gui_hint:       "వ్యవసాయ విస్తరణ అధికారులు, సలహాదారులు లేదా నెట్‌వర్క్‌లకు ప్రాప్తి",
    s2_pln_label:      "వ్యవసాయ నిర్వహణ ప్రణాళిక సామర్థ్యం",
    s2_pln_hint:       "నిర్మాణాత్మక లేదా డిజిటల్ విధానాలు ఉపయోగించి వ్యవసాయ కార్యక్రమాలను ప్లాన్ చేసే సామర్థ్యం",
    s2_con_label:      "సాంకేతిక స్వీకృతి నిరంతరత",
    s2_con_hint:       "కొత్త డిజిటల్ సాధనాలు లేదా సలహాలను క్రమంగా ఉపయోగించడం",
    select_default:    "-- ఎంచుకోండి --",
    select_error:      "దయచేసి విలువను ఎంచుకోండి.",
    res_1: "1 – డిజిటల్ మౌలిక సదుపాయాలు లేవు",
    res_2: "2 – చాలా పరిమిత ప్రాప్తి (భాగస్వామ్య/అడపాదడపా)",
    res_3: "3 – అనుసంధానత అంతరాలతో మధ్యస్థ ప్రాప్తి",
    res_4: "4 – ముఖ్య డిజిటల్ సేవలకు విశ్వసనీయ ప్రాప్తి",
    res_5: "5 – పూర్తి మరియు స్థిరమైన డిజిటల్ మౌలిక సదుపాయాల ప్రాప్తి",
    gui_1: "1 – విస్తరణ మద్దతు లేదు",
    gui_2: "2 – అప్పుడప్పుడు అనధికారిక సహోద్యోగి సలహా మాత్రమే",
    gui_3: "3 – విస్తరణ సేవలతో ఆవర్తన సంప్రదింపు",
    gui_4: "4 – నిర్మాణాత్మక విస్తరణ మద్దతుకు క్రమ ప్రాప్తి",
    gui_5: "5 – బలమైన బహు-ఛానల్ విస్తరణ మద్దతు నెట్‌వర్క్",
    pln_1: "1 – పూర్తిగా ప్రతిస్పందించే; నిర్మాణాత్మక ప్రణాళిక లేదు",
    pln_2: "2 – అనధికారిక కాలానుగుణ ప్రణాళిక, అనుభవ ఆధారిత",
    pln_3: "3 – అప్పుడప్పుడు రికార్డులతో బేసిక్ పంట-చక్ర ప్రణాళిక",
    pln_4: "4 – కొంత డిజిటల్ డాక్యుమెంటేషన్‌తో నిర్మాణాత్మక ప్రణాళిక",
    pln_5: "5 – డేటా-ఆధారిత, క్రమబద్ధమైన వ్యవసాయ నిర్వహణ ప్రణాళిక",
    con_1: "1 – అరుదుగా స్వీకరిస్తారు లేదా సాధనాలను త్వరగా వదలివేస్తారు",
    con_2: "2 – అప్పుడప్పుడు ప్రయత్నిస్తారు, స్వీకృతి అస్థిరంగా ఉంటుంది",
    con_3: "3 – కొంత నిరంతర వినియోగంతో మధ్యస్థ స్వీకృతి",
    con_4: "4 – స్వల్ప తగ్గుదలలతో స్థిరమైన స్వీకృతి",
    con_5: "5 – నిరంతర మరియు క్రమశిక్షణతో కూడిన సాంకేతిక స్వీకృతి",

    s3_tag:            "దశ 3 — సేకరణ",
    s3_title:          "సందర్భ అంశాలు & అడ్డంకులు",
    s3_desc:           "ఈ ఇన్‌పుట్‌లు అనుకూల సలహా అవుట్‌పుట్‌ను రూపొందిస్తాయి.",
    s3_con_label:      "ప్రాథమిక స్వీకృతి అడ్డంకి",
    s3_con_hint:       "డిజిటల్ విస్తరణ స్వీకరణను ప్రభావితం చేసే ముఖ్య అడ్డంకి",
    s3_use_label:      "డిజిటల్ సాధనాల గ్రహణీయత",
    s3_use_hint:       "వ్యవసాయ యాప్‌లు లేదా ప్లాట్‌ఫారమ్‌లను వాడటం యొక్క స్వీయ అంచనా",
    s3_fb_label:       "ముక్తవదన సందర్భ ప్రతిస్పందన",
    s3_fb_hint:        "సవాళ్లు, ఆకాంక్షలు లేదా అదనపు సందర్భం",
    s3_fb_placeholder: "మీ వ్యవసాయ సందర్భం, సవాళ్లు లేదా డిజిటల్ స్వీకృతి అనుభవాన్ని వివరించండి…",
    con_financial:     "ఆర్థిక పరిమితులు",
    con_tech:          "పరికరం లేదా అనుసంధానత ప్రాప్తి పరిమితం",
    con_skill:         "డిజిటల్ అక్షరాస్యత లేదా నైపుణ్య అంతరం",
    con_infra:         "పేలవమైన గ్రామీణ మౌలిక సదుపాయాలు",
    con_market:        "మార్కెట్ లేదా సప్లై-చెయిన్ అనుసంధానత లేకపోవడం",
    con_lang:          "భాష లేదా అక్షరాస్యత అడ్డంకి",
    con_none:          "ముఖ్యమైన అడ్డంకి గుర్తించబడలేదు",
    use_veryeasy:      "చాలా సులభం – సాధనాలు అందుబాటులో ఉన్నాయి",
    use_easy:          "సులభం – స్వల్ప ఇబ్బందితో వాడవచ్చు",
    use_neutral:       "తటస్థ – మిశ్రమ అనుభవం",
    use_difficult:     "కష్టం – గణనీయమైన మద్దతు అవసరం",
    use_verydifficult: "చాలా కష్టం – సహాయం లేకుండా అందుబాటులో లేదు",

    btn_proceed:        "ముందుకు →",
    btn_back:           "← వెనక్కు",
    btn_submit:         "సలహా నివేదికను రూపొందించండి →",
    btn_tts:            "🔊 సలహా చదవండి",
    btn_new:            "↺ కొత్త అంచనా",
    btn_save:           "↓ నివేదిక సేవ్ చేయండి",
    btn_submit_feedback:"అభిప్రాయం సమర్పించండి →",

    loading_title:     "సలహా నివేదిక రూపొందిస్తోంది…",
    loading_sub:       "ప్రతిస్పందనలు విశ్లేషిస్తోంది · సంసిద్ధత నమూనాను వర్తింపజేస్తోంది",

    report_label:      "డిజిటల్ విస్తరణ సంసిద్ధత నివేదిక",
    report_title:      "అంచనా నివేదిక",
    card_a_title:      "అంచనా సారాంశం",
    card_b_title:      "సంసిద్ధత వివరణ",
    card_c_title:      "గుర్తించిన ముఖ్య అడ్డంకులు",
    card_d_title:      "అనుకూల సలహా అవుట్‌పుట్",
    card_e_title:      "ఈ సలహా ఎందుకు రూపొందించబడింది",
    card_f_title:      "సూచించిన తదుపరి దశలు",
    card_g_title:      "విస్తరణ మద్దతు సిఫారసు",
    card_h_title:      "సలహాపై అభిప్రాయం",
    sum_exp:           "డిజిటల్ అనుభవం",
    sum_barrier:       "ప్రాథమిక అడ్డంకి",
    sum_usability:     "సాధన గ్రహణీయత",
    sum_lang:          "సలహా భాష",
    score_label:       "సమగ్ర సంసిద్ధత స్కోర్",
    score_none:        "శూన్యం",
    score_low:         "తక్కువ",
    score_med:         "మధ్యమ",
    score_high:        "అధికం",
    xai_label:         "వివరణాత్మకత",
    hitl_label:        "మానవుడు-లూప్‌లో",
    feedback_stage:    "అభిప్రాయ దశ",
    fb_rate_label:     "ఈ సలహా యొక్క ఔచిత్యాన్ని రేట్ చేయండి",
    fb_not_rated:      "రేట్ చేయబడలేదు",
    fb_impl_label:     "మీరు ఈ సిఫారసులను అమలు చేస్తారా?",
    fb_yes:            "అవును",
    fb_partial:        "పాక్షికంగా",
    fb_no:             "లేదు",
    fb_support_label:  "అమలుకు ఏ మద్దతు సహాయపడుతుంది?",
    fb_support_placeholder: "సహాయం, శిక్షణ లేదా వనరులు వివరించండి…",
    fb_confirmed:      "అభిప్రాయం నమోదు చేయబడింది. ఈ ఇన్‌పుట్ అనుకూల ఫీడ్‌బ్యాక్ లూప్‌కు దోహదపడుతుంది.",
    optional:          "(ఐచ్ఛికం)",
    footer:            "AgriReadiness © 2025 · వ్యవసాయ విస్తరణ కోసం డిజిటల్ సాధన కిట్",
    interp_low:   "స్కోర్ ప్రారంభ-దశ డిజిటల్ సంసిద్ధతను సూచిస్తుంది. ప్రాథమిక జోక్యాలు సూచించబడ్డాయి.",
    interp_med:   "స్కోర్ పరివర్తన డిజిటల్ సంసిద్ధతను సూచిస్తుంది. లక్ష్య సామర్థ్య-నిర్మాణ జోక్యాలు సిఫారసు చేయబడ్డాయి.",
    interp_high:  "స్కోర్ స్థాపిత డిజిటల్ సంసిద్ధతను సూచిస్తుంది. అధునాతన అనువర్తనాలపై దృష్టి పెట్టాలి.",
    xai_score: "స్కోర్", xai_infra: "మౌలిక సదుపాయాలు", xai_extension: "విస్తరణ మద్దతు",
    xai_constraint: "అడ్డంకి", xai_usability: "గ్రహణీయత", xai_openresponse: "ముక్తవదన ప్రతిస్పందన", xai_language: "భాష",
  },

  // ─────────────────────────────────────────────
  hi: {  // HINDI
    tagline:           "कृषि विस्तार के लिए डिजिटल टूलकिट",
    arch_collection:   "संग्रह",
    arch_analysis:     "विश्लेषण",
    arch_advisory:     "सलाह",
    arch_feedback:     "प्रतिक्रिया",
    step1_label:       "किसान प्रोफाइल",
    step2_label:       "विस्तार तत्परता",
    step3_label:       "संदर्भ और बाधाएँ",

    s1_tag:            "चरण 1 — संग्रह",
    s1_title:          "किसान प्रोफाइल",
    s1_desc:           "बुनियादी पहचान और डिजिटल संलग्नता का स्तर।",
    s1_name_label:     "उत्तरदाता का नाम",
    s1_name_placeholder: "पूरा नाम दर्ज करें",
    s1_name_error:     "कृपया अपना नाम दर्ज करें।",
    s1_exp_label:      "पूर्व डिजिटल संलग्नता स्तर",
    s1_exp_hint:       "डिजिटल उपकरणों और सेवाओं पर स्व-मूल्यांकन",
    s1_exp_error:      "कृपया संलग्नता स्तर चुनें।",
    exp_low:           "कम",
    exp_low_desc:      "डिजिटल उपकरणों का न्यूनतम या कोई उपयोग नहीं",
    exp_med:           "मध्यम",
    exp_med_desc:      "मोबाइल/ऐप का कभी-कभी उपयोग",
    exp_high:          "उच्च",
    exp_high_desc:     "नियमित और आत्मविश्वास के साथ डिजिटल उपयोग",
    s1_lang_label:     "पसंदीदा सलाह भाषा",
    s1_lang_hint:      "AI द्वारा उत्पन्न सलाह इस भाषा में प्रदान की जाएगी",

    s2_tag:            "चरण 2 — संग्रह",
    s2_title:          "कृषि डिजिटल विस्तार तत्परता",
    s2_desc:           "चार डिजिटल विस्तार तत्परता आयामों में वर्तमान क्षमता को रेट करें।",
    s2_res_label:      "डिजिटल बुनियादी ढाँचे तक पहुँच",
    s2_res_hint:       "उपकरणों, इंटरनेट और कृषि डिजिटल सेवाओं की उपलब्धता",
    s2_gui_label:      "विस्तार सहायता उपलब्धता",
    s2_gui_hint:       "कृषि विस्तार अधिकारियों, सलाहकारों या नेटवर्क तक पहुँच",
    s2_pln_label:      "कृषि प्रबंधन योजना क्षमता",
    s2_pln_hint:       "संरचित या डिजिटल दृष्टिकोण का उपयोग करके कृषि कार्यों की योजना बनाने की क्षमता",
    s2_con_label:      "प्रौद्योगिकी अपनाने की निरंतरता",
    s2_con_hint:       "नए डिजिटल उपकरणों या सिफारिशों से नियमित जुड़ाव",
    select_default:    "-- चुनें --",
    select_error:      "कृपया एक मान चुनें।",
    res_1: "1 – डिजिटल बुनियादी ढाँचे तक कोई पहुँच नहीं",
    res_2: "2 – बहुत सीमित पहुँच (साझा/रुक-रुक कर)",
    res_3: "3 – कनेक्टिविटी अंतराल के साथ मध्यम पहुँच",
    res_4: "4 – मुख्य डिजिटल सेवाओं तक विश्वसनीय पहुँच",
    res_5: "5 – पूर्ण और सुसंगत डिजिटल बुनियादी ढाँचे तक पहुँच",
    gui_1: "1 – कोई विस्तार सहायता उपलब्ध नहीं",
    gui_2: "2 – केवल कभी-कभी अनौपचारिक सहकर्मी सलाह",
    gui_3: "3 – विस्तार सेवाओं से आवधिक संपर्क",
    gui_4: "4 – संरचित विस्तार सहायता तक नियमित पहुँच",
    gui_5: "5 – मजबूत, बहु-चैनल विस्तार सहायता नेटवर्क",
    pln_1: "1 – पूरी तरह प्रतिक्रियाशील; कोई संरचित योजना नहीं",
    pln_2: "2 – अनौपचारिक मौसमी योजना, अनुभव-आधारित",
    pln_3: "3 – कभी-कभी रिकॉर्ड के साथ बुनियादी फसल-चक्र योजना",
    pln_4: "4 – कुछ डिजिटल दस्तावेज़ीकरण के साथ संरचित योजना",
    pln_5: "5 – डेटा-सूचित, व्यवस्थित कृषि प्रबंधन योजना",
    con_1: "1 – शायद ही कभी अपनाता है या उपकरण जल्दी छोड़ देता है",
    con_2: "2 – कभी-कभी प्रयास करता है, अपनाना असंगत है",
    con_3: "3 – कुछ निरंतर उपयोग के साथ मध्यम अपनाना",
    con_4: "4 – मामूली कमी के साथ सुसंगत अपनाना",
    con_5: "5 – निरंतर और अनुशासित प्रौद्योगिकी अपनाना",

    s3_tag:            "चरण 3 — संग्रह",
    s3_title:          "संदर्भ कारक और बाधाएँ",
    s3_desc:           "ये इनपुट अनुकूली सलाह आउटपुट को आकार देते हैं।",
    s3_con_label:      "प्राथमिक अपनाने की बाधा",
    s3_con_hint:       "डिजिटल विस्तार को प्रभावित करने वाली मुख्य बाधा",
    s3_use_label:      "डिजिटल उपकरणों की कथित उपयोगिता",
    s3_use_hint:       "कृषि ऐप्स या प्लेटफॉर्म उपयोग का स्व-मूल्यांकन",
    s3_fb_label:       "मुक्त संदर्भ प्रतिक्रिया",
    s3_fb_hint:        "चुनौतियाँ, आकांक्षाएँ या अतिरिक्त संदर्भ",
    s3_fb_placeholder: "अपने कृषि संदर्भ, चुनौतियों या डिजिटल अपनाने के अनुभव का वर्णन करें…",
    con_financial:     "वित्तीय सीमाएँ",
    con_tech:          "सीमित उपकरण या कनेक्टिविटी पहुँच",
    con_skill:         "डिजिटल साक्षरता या कौशल अंतर",
    con_infra:         "खराब ग्रामीण बुनियादी ढाँचा",
    con_market:        "बाजार या आपूर्ति-श्रृंखला कनेक्टिविटी का अभाव",
    con_lang:          "भाषा या साक्षरता बाधा",
    con_none:          "कोई महत्वपूर्ण बाधा नहीं",
    use_veryeasy:      "बहुत आसान – उपकरण सुलभ और सहज हैं",
    use_easy:          "आसान – मामूली कठिनाई से उपयोग कर सकते हैं",
    use_neutral:       "तटस्थ – मिश्रित अनुभव",
    use_difficult:     "कठिन – महत्वपूर्ण सहायता की आवश्यकता है",
    use_verydifficult: "बहुत कठिन – सहायता के बिना दुर्गम",

    btn_proceed:        "आगे बढ़ें →",
    btn_back:           "← वापस",
    btn_submit:         "सलाह रिपोर्ट तैयार करें →",
    btn_tts:            "🔊 सलाह पढ़ें",
    btn_new:            "↺ नया आकलन",
    btn_save:           "↓ रिपोर्ट सहेजें",
    btn_submit_feedback:"प्रतिक्रिया सबमिट करें →",

    loading_title:     "सलाह रिपोर्ट तैयार हो रही है…",
    loading_sub:       "प्रतिक्रियाओं का विश्लेषण · तत्परता मॉडल लागू करना",

    report_label:      "डिजिटल विस्तार तत्परता रिपोर्ट",
    report_title:      "आकलन रिपोर्ट",
    card_a_title:      "आकलन सारांश",
    card_b_title:      "तत्परता व्याख्या",
    card_c_title:      "मुख्य बाधाएँ",
    card_d_title:      "अनुकूली सलाह आउटपुट",
    card_e_title:      "यह सलाह क्यों तैयार की गई",
    card_f_title:      "सुझाए गए अगले कदम",
    card_g_title:      "विस्तार सहायता सिफारिश",
    card_h_title:      "सलाह पर प्रतिक्रिया",
    sum_exp:           "डिजिटल अनुभव",
    sum_barrier:       "प्राथमिक बाधा",
    sum_usability:     "उपकरण उपयोगिता",
    sum_lang:          "सलाह भाषा",
    score_label:       "समग्र तत्परता स्कोर",
    score_none:        "शून्य",
    score_low:         "कम",
    score_med:         "मध्यम",
    score_high:        "उच्च",
    xai_label:         "व्याख्यात्मकता",
    hitl_label:        "मानव-लूप-में",
    feedback_stage:    "प्रतिक्रिया चरण",
    fb_rate_label:     "इस सलाह की प्रासंगिकता रेट करें",
    fb_not_rated:      "रेट नहीं किया गया",
    fb_impl_label:     "क्या आप इन सिफारिशों को लागू करेंगे?",
    fb_yes:            "हाँ",
    fb_partial:        "आंशिक रूप से",
    fb_no:             "नहीं",
    fb_support_label:  "कार्यान्वयन में कौन सी सहायता मदद करेगी?",
    fb_support_placeholder: "सहायता, प्रशिक्षण या संसाधनों का वर्णन करें…",
    fb_confirmed:      "प्रतिक्रिया दर्ज की गई। यह इनपुट अनुकूली फीडबैक लूप में योगदान करता है।",
    optional:          "(वैकल्पिक)",
    footer:            "AgriReadiness © 2025 · कृषि विस्तार के लिए डिजिटल टूलकिट",
    interp_low:   "स्कोर प्रारंभिक-चरण डिजिटल तत्परता दर्शाता है। बुनियादी हस्तक्षेप की आवश्यकता है।",
    interp_med:   "स्कोर संक्रमणकालीन डिजिटल तत्परता दर्शाता है। लक्षित क्षमता-निर्माण की सिफारिश की जाती है।",
    interp_high:  "स्कोर स्थापित डिजिटल तत्परता दर्शाता है। उन्नत अनुप्रयोगों पर ध्यान केंद्रित करें।",
    xai_score: "स्कोर", xai_infra: "बुनियादी ढाँचा", xai_extension: "विस्तार सहायता",
    xai_constraint: "बाधा", xai_usability: "उपयोगिता", xai_openresponse: "मुक्त प्रतिक्रिया", xai_language: "भाषा",
  },

  // ─────────────────────────────────────────────
  ta: {  // TAMIL
    tagline:           "விவசாய விரிவாக்கத்திற்கான டிஜிட்டல் கருவித்தொகுப்பு",
    arch_collection:   "சேகரிப்பு",
    arch_analysis:     "பகுப்பாய்வு",
    arch_advisory:     "ஆலோசனை",
    arch_feedback:     "கருத்து",
    step1_label:       "விவசாயி சுயவிவரம்",
    step2_label:       "விரிவாக்க தயார்நிலை",
    step3_label:       "சூழல் & தடைகள்",

    s1_tag:            "படி 1 — சேகரிப்பு",
    s1_title:          "விவசாயி சுயவிவரம்",
    s1_desc:           "அடிப்படை அடையாளம் மற்றும் டிஜிட்டல் ஈடுபாட்டு நிலை.",
    s1_name_label:     "பதிலளிப்பாளர் பெயர்",
    s1_name_placeholder: "முழு பெயரை உள்ளிடவும்",
    s1_name_error:     "உங்கள் பெயரை உள்ளிடவும்.",
    s1_exp_label:      "முன்னர் டிஜிட்டல் ஈடுபாட்டு நிலை",
    s1_exp_hint:       "டிஜிட்டல் சாதனங்கள் மற்றும் சேவைகளில் சுய மதிப்பீடு",
    s1_exp_error:      "ஒரு ஈடுபாட்டு நிலையை தேர்ந்தெடுக்கவும்.",
    exp_low:           "குறைவு",
    exp_low_desc:      "டிஜிட்டல் கருவி பயன்பாடு குறைவாக அல்லது இல்லை",
    exp_med:           "நடுத்தர",
    exp_med_desc:      "மொபைல்/ஆப்ஸை அவ்வப்போது பயன்படுத்துதல்",
    exp_high:          "அதிகம்",
    exp_high_desc:     "தொடர்ந்து மற்றும் நம்பிக்கையுடன் டிஜிட்டல் பயன்பாடு",
    s1_lang_label:     "விரும்பிய ஆலோசனை மொழி",
    s1_lang_hint:      "AI உருவாக்கிய ஆலோசனை இந்த மொழியில் வழங்கப்படும்",

    s2_tag:            "படி 2 — சேகரிப்பு",
    s2_title:          "விவசாய டிஜிட்டல் விரிவாக்க தயார்நிலை",
    s2_desc:           "நான்கு டிஜிட்டல் விரிவாக்க தயார்நிலை பரிமாணங்களில் தற்போதைய திறனை மதிப்பிடவும்.",
    s2_res_label:      "டிஜிட்டல் உள்கட்டமைப்பு அணுகல்",
    s2_res_hint:       "சாதனங்கள், இணையம் மற்றும் விவசாய டிஜிட்டல் சேவைகளின் கிடைக்கும் தன்மை",
    s2_gui_label:      "விரிவாக்க ஆதரவு கிடைக்கும் தன்மை",
    s2_gui_hint:       "விவசாய விரிவாக்க அதிகாரிகள், ஆலோசகர்கள் அல்லது நெட்வொர்க்குகளுக்கான அணுகல்",
    s2_pln_label:      "பண்ணை மேலாண்மை திட்டமிடல் திறன்",
    s2_pln_hint:       "கட்டமைக்கப்பட்ட அல்லது டிஜிட்டல் அணுகுமுறைகளைப் பயன்படுத்தி திட்டமிடும் திறன்",
    s2_con_label:      "தொழில்நுட்ப ஏற்பு நிலைத்தன்மை",
    s2_con_hint:       "புதிய டிஜிட்டல் கருவிகள் அல்லது பரிந்துரைகளுடன் தொடர்ந்து ஈடுபடுதல்",
    select_default:    "-- தேர்ந்தெடுக்கவும் --",
    select_error:      "ஒரு மதிப்பை தேர்ந்தெடுக்கவும்.",
    res_1: "1 – டிஜிட்டல் உள்கட்டமைப்பு அணுகல் இல்லை",
    res_2: "2 – மிகவும் வரையறுக்கப்பட்ட அணுகல் (பகிரப்பட்ட/இடைவிடாத)",
    res_3: "3 – இணைப்பு இடைவெளிகளுடன் மிதமான அணுகல்",
    res_4: "4 – முக்கிய டிஜிட்டல் சேவைகளுக்கு நம்பகமான அணுகல்",
    res_5: "5 – முழுமையான மற்றும் நிலையான டிஜிட்டல் உள்கட்டமைப்பு அணுகல்",
    gui_1: "1 – விரிவாக்க ஆதரவு இல்லை",
    gui_2: "2 – அவ்வப்போது முறைசாரா சக ஆலோசனை மட்டுமே",
    gui_3: "3 – விரிவாக்க சேவைகளுடன் அவ்வப்போது தொடர்பு",
    gui_4: "4 – கட்டமைக்கப்பட்ட விரிவாக்க ஆதரவுக்கு வழக்கமான அணுகல்",
    gui_5: "5 – வலுவான, பல-சேனல் விரிவாக்க ஆதரவு நெட்வொர்க்",
    pln_1: "1 – முழுக்க எதிர்வினை; கட்டமைக்கப்பட்ட திட்டமிடல் இல்லை",
    pln_2: "2 – முறைசாரா பருவகால திட்டமிடல், அனுபவ அடிப்படையிலானது",
    pln_3: "3 – அவ்வப்போது பதிவுகளுடன் அடிப்படை பயிர்-சுழற்சி திட்டமிடல்",
    pln_4: "4 – சில டிஜிட்டல் ஆவணப்படுத்தலுடன் கட்டமைக்கப்பட்ட திட்டமிடல்",
    pln_5: "5 – தரவு-தகவல், முறையான பண்ணை மேலாண்மை திட்டமிடல்",
    con_1: "1 – அரிதாக ஏற்றுக்கொள்கிறார் அல்லது கருவிகளை விரைவில் கைவிடுகிறார்",
    con_2: "2 – அவ்வப்போது முயற்சிக்கிறார், ஏற்பு நிலையற்றது",
    con_3: "3 – சில நிலையான பயன்பாட்டுடன் மிதமான ஏற்பு",
    con_4: "4 – சிறிய குறைவுகளுடன் நிலையான ஏற்பு",
    con_5: "5 – நிலையான மற்றும் ஒழுக்கமான தொழில்நுட்ப ஏற்பு",

    s3_tag:            "படி 3 — சேகரிப்பு",
    s3_title:          "சூழல் காரணிகள் & தடைகள்",
    s3_desc:           "இந்த உள்ளீடுகள் தகவமைப்பு ஆலோசனை வெளியீட்டை வடிவமைக்கின்றன.",
    s3_con_label:      "முதன்மை ஏற்பு தடை",
    s3_con_hint:       "டிஜிட்டல் விரிவாக்கத்தை பாதிக்கும் முக்கிய தடை",
    s3_use_label:      "டிஜிட்டல் கருவிகளின் உணரப்பட்ட பயன்பாட்டுத் திறன்",
    s3_use_hint:       "விவசாய ஆப்ஸ் அல்லது தளங்களை பயன்படுத்துவதில் சுய மதிப்பீடு",
    s3_fb_label:       "திறந்த சூழல் பதில்",
    s3_fb_hint:        "சவால்கள், அபிலாஷைகள் அல்லது கூடுதல் சூழல்",
    s3_fb_placeholder: "உங்கள் விவசாய சூழல், சவால்கள் அல்லது டிஜிட்டல் ஏற்பு அனுபவத்தை விவரிக்கவும்…",
    con_financial:     "நிதி வரையறைகள்",
    con_tech:          "வரையறுக்கப்பட்ட சாதன அல்லது இணைப்பு அணுகல்",
    con_skill:         "டிஜிட்டல் கல்வியறிவு அல்லது திறன் இடைவெளி",
    con_infra:         "மோசமான கிராமப்புற உள்கட்டமைப்பு",
    con_market:        "சந்தை அல்லது விநியோக-சங்கிலி இணைப்பு இல்லாமை",
    con_lang:          "மொழி அல்லது கல்வியறிவு தடை",
    con_none:          "குறிப்பிடத்தக்க தடை இல்லை",
    use_veryeasy:      "மிக எளிதானது – கருவிகள் அணுகக்கூடியவை மற்றும் உள்ளுணர்வுடையவை",
    use_easy:          "எளிதானது – சிறிய சிரமத்துடன் பயன்படுத்தலாம்",
    use_neutral:       "நடுநிலை – கலப்பட அனுபவம்",
    use_difficult:     "கடினமானது – குறிப்பிடத்தக்க ஆதரவு தேவை",
    use_verydifficult: "மிகவும் கடினமானது – உதவியின்றி அணுக முடியாதது",

    btn_proceed:        "தொடரவும் →",
    btn_back:           "← திரும்பு",
    btn_submit:         "ஆலோசனை அறிக்கையை உருவாக்கவும் →",
    btn_tts:            "🔊 ஆலோசனையை படிக்கவும்",
    btn_new:            "↺ புதிய மதிப்பீடு",
    btn_save:           "↓ அறிக்கையை சேமிக்கவும்",
    btn_submit_feedback:"கருத்தை சமர்ப்பிக்கவும் →",

    loading_title:     "ஆலோசனை அறிக்கை உருவாக்கப்படுகிறது…",
    loading_sub:       "பதில்களை பகுப்பாய்வு செய்கிறது · தயார்நிலை மாதிரியை பயன்படுத்துகிறது",

    report_label:      "டிஜிட்டல் விரிவாக்க தயார்நிலை அறிக்கை",
    report_title:      "மதிப்பீட்டு அறிக்கை",
    card_a_title:      "மதிப்பீட்டு சுருக்கம்",
    card_b_title:      "தயார்நிலை விளக்கம்",
    card_c_title:      "கண்டறியப்பட்ட முக்கிய தடைகள்",
    card_d_title:      "தகவமைப்பு ஆலோசனை வெளியீடு",
    card_e_title:      "இந்த ஆலோசனை ஏன் உருவாக்கப்பட்டது",
    card_f_title:      "பரிந்துரைக்கப்பட்ட அடுத்த படிகள்",
    card_g_title:      "விரிவாக்க ஆதரவு பரிந்துரை",
    card_h_title:      "ஆலோசனை கருத்து",
    sum_exp:           "டிஜிட்டல் அனுபவம்",
    sum_barrier:       "முதன்மை தடை",
    sum_usability:     "கருவி பயன்பாட்டுத் திறன்",
    sum_lang:          "ஆலோசனை மொழி",
    score_label:       "கலப்பு தயார்நிலை மதிப்பெண்",
    score_none:        "இல்லை",
    score_low:         "குறைவு",
    score_med:         "நடுத்தர",
    score_high:        "அதிகம்",
    xai_label:         "விளக்கமளிக்கும் தன்மை",
    hitl_label:        "மனிதன்-வளையத்தில்",
    feedback_stage:    "கருத்து நிலை",
    fb_rate_label:     "இந்த ஆலோசனையின் பொருத்தத்தை மதிப்பிடவும்",
    fb_not_rated:      "மதிப்பிடப்படவில்லை",
    fb_impl_label:     "இந்த பரிந்துரைகளை நீங்கள் செயல்படுத்துவீர்களா?",
    fb_yes:            "ஆம்",
    fb_partial:        "ஓரளவு",
    fb_no:             "இல்லை",
    fb_support_label:  "செயல்படுத்துவதற்கு என்ன ஆதரவு உதவும்?",
    fb_support_placeholder: "உதவி, பயிற்சி அல்லது வளங்களை விவரிக்கவும்…",
    fb_confirmed:      "கருத்து பதிவு செய்யப்பட்டது. இந்த உள்ளீடு தகவமைப்பு கருத்து சுழற்சிக்கு பங்களிக்கிறது.",
    optional:          "(விரும்பினால்)",
    footer:            "AgriReadiness © 2025 · விவசாய விரிவாக்கத்திற்கான டிஜிட்டல் கருவித்தொகுப்பு",
    interp_low:   "மதிப்பெண் ஆரம்பகட்ட டிஜிட்டல் தயார்நிலையை குறிக்கிறது. அடிப்படை தலையீடுகள் தேவை.",
    interp_med:   "மதிப்பெண் மாறுகட்ட டிஜிட்டல் தயார்நிலையை குறிக்கிறது. இலக்கு திறன்-வளர்ப்பு பரிந்துரைக்கப்படுகிறது.",
    interp_high:  "மதிப்பெண் நிறுவப்பட்ட டிஜிட்டல் தயார்நிலையை குறிக்கிறது. மேம்பட்ட பயன்பாடுகளில் கவனம் செலுத்தவும்.",
    xai_score: "மதிப்பெண்", xai_infra: "உள்கட்டமைப்பு", xai_extension: "விரிவாக்க ஆதரவு",
    xai_constraint: "தடை", xai_usability: "பயன்பாட்டுத் திறன்", xai_openresponse: "திறந்த பதில்", xai_language: "மொழி",
  }
};

// -----------------------------------------------
// ACTIVE LANGUAGE STATE
// -----------------------------------------------
let activeLang = "en";

// -----------------------------------------------
// switchLanguage(code)
// Called by header pill buttons AND advisory lang dropdown
// Updates all data-i18n elements + placeholders
// -----------------------------------------------
function switchLanguage(code) {
  if (!TRANSLATIONS[code]) return;
  activeLang = code;

  const t = TRANSLATIONS[code];

  // 1. Update all data-i18n text elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // 2. Update all data-i18n-placeholder elements
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // 3. Update select option text
  document.querySelectorAll("option[data-i18n]").forEach(opt => {
    const key = opt.getAttribute("data-i18n");
    if (t[key] !== undefined) opt.textContent = t[key];
  });

  // 4. Sync header lang toggle buttons
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === code);
  });

  // 5. Keep html lang attribute updated for accessibility
  document.documentElement.lang = code;
}

// -----------------------------------------------
// onAdvisoryLangChange
// When Section 1 dropdown changes, sync the UI lang toggle
// so both controls always reflect the same choice
// -----------------------------------------------
function onAdvisoryLangChange(value) {
  const map = { English: "en", Telugu: "te", Hindi: "hi", Tamil: "ta" };
  const code = map[value] || "en";
  switchLanguage(code);
  // Also update formData immediately
  formData.advisoryLang = value;
}

// -----------------------------------------------
// STATE
// -----------------------------------------------
let formData = {
  name: "", digitalExp: "", advisoryLang: "English",
  resources: 0, guidance: 0, planning: 0, consistency: 0,
  constraints: "", usability: "", feedback: "",
  score: 0, category: ""
};

let currentRating  = 0;
let currentSection = 1;
let ttsUtterance   = null;

// -----------------------------------------------
// ON LOAD — restore saved data + apply default lang
// -----------------------------------------------
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("agriReadinessData");
  if (saved) {
    try {
      const p = JSON.parse(saved);
      if (p.name)         document.getElementById("farmerName").value   = p.name;
      if (p.advisoryLang) document.getElementById("advisoryLang").value = p.advisoryLang;
      if (p.digitalExp)   document.querySelectorAll('input[name="digitalExp"]').forEach(r => { if (r.value === p.digitalExp) r.checked = true; });
      ["resources","guidance","planning","consistency","constraints","usability"].forEach(id => {
        if (p[id]) document.getElementById(id).value = p[id];
      });
      if (p.feedback) document.getElementById("feedback").value = p.feedback;
      // Restore language if saved
      if (p.advisoryLang) {
        const map = { English: "en", Telugu: "te", Hindi: "hi", Tamil: "ta" };
        switchLanguage(map[p.advisoryLang] || "en");
      }
    } catch (e) {}
  }

  // Set report date
  const dateEl = document.getElementById("reportDate");
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
});

// -----------------------------------------------
// ARCH STRIP HIGHLIGHT
// -----------------------------------------------
function highlightArch(stage) {
  ["collection","analysis","advisory","feedback"].forEach(s => {
    const el = document.getElementById("arch-" + s);
    if (el) el.classList.remove("active-arch");
  });
  const target = document.getElementById("arch-" + stage);
  if (target) target.classList.add("active-arch");
}

// -----------------------------------------------
// NAVIGATION
// -----------------------------------------------
function goToSection(num) {
  ["section1","section2","section3","resultSection"].forEach(id =>
    document.getElementById(id).classList.add("hidden"));
  if (num === 1) document.getElementById("section1").classList.remove("hidden");
  if (num === 2) document.getElementById("section2").classList.remove("hidden");
  if (num === 3) document.getElementById("section3").classList.remove("hidden");
  currentSection = num;
  updateProgress(num);
  highlightArch("collection");
  scrollToTop();
}

function updateProgress(step) {
  const fill = document.getElementById("progressFill");
  const dots  = document.querySelectorAll(".step");
  const widths = { 1: 16, 2: 50, 3: 84, 4: 100 };
  fill.style.width = (widths[step] || 16) + "%";
  dots.forEach((dot, idx) => {
    dot.classList.remove("active", "completed");
    if (Math.floor(idx / 2) + 1 < step)  dot.classList.add("completed");
    if (Math.floor(idx / 2) + 1 === step) dot.classList.add("active");
  });
}

// -----------------------------------------------
// SECTION 1 VALIDATE & PROCEED
// -----------------------------------------------
function proceedToSection2() {
  let valid = true;
  const t = TRANSLATIONS[activeLang];

  const name = document.getElementById("farmerName").value.trim();
  const nameErr = document.getElementById("nameError");
  if (!name) {
    nameErr.classList.add("show");
    document.getElementById("farmerName").classList.add("error");
    valid = false;
  } else {
    nameErr.classList.remove("show");
    document.getElementById("farmerName").classList.remove("error");
    formData.name = name;
  }

  const digitalExpVal = document.querySelector('input[name="digitalExp"]:checked');
  const digitalExpErr = document.getElementById("digitalExpError");
  if (!digitalExpVal) {
    digitalExpErr.classList.add("show"); valid = false;
  } else {
    digitalExpErr.classList.remove("show");
    formData.digitalExp = digitalExpVal.value;
  }

  formData.advisoryLang = document.getElementById("advisoryLang").value || "English";
  if (valid) goToSection(2);
}

// -----------------------------------------------
// SECTION 2 VALIDATE & PROCEED
// -----------------------------------------------
function proceedToSection3() {
  let valid = true;
  ["resources","guidance","planning","consistency"].forEach(field => {
    const el  = document.getElementById(field);
    const err = document.getElementById(field + "Error");
    if (!el.value) {
      err.classList.add("show"); el.classList.add("error"); valid = false;
    } else {
      err.classList.remove("show"); el.classList.remove("error");
      formData[field] = parseInt(el.value);
    }
  });
  if (valid) goToSection(3);
}

// -----------------------------------------------
// SECTION 3 SUBMIT
// -----------------------------------------------
function submitAssessment() {
  formData.constraints = document.getElementById("constraints").value || "None identified";
  formData.usability   = document.getElementById("usability").value   || "Not specified";
  formData.feedback    = document.getElementById("feedback").value.trim() || "No open-ended response provided";
  formData.score       = formData.resources + formData.guidance + formData.planning + formData.consistency;
  formData.category    = formData.score <= 8 ? "Low" : formData.score <= 16 ? "Medium" : "High";

  document.getElementById("section3").classList.add("hidden");
  document.getElementById("resultSection").classList.remove("hidden");
  updateProgress(4);
  document.getElementById("loadingState").classList.remove("hidden");
  document.getElementById("resultContent").classList.add("hidden");
  highlightArch("analysis");
  scrollToTop();
  fetchAdvisory();
}

// -----------------------------------------------
// FETCH ADVISORY
// -----------------------------------------------
async function fetchAdvisory() {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-advisory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name:               formData.name,
        score:              formData.score,
        category:           formData.category,
        digital_experience: formData.digitalExp,
        usability:          formData.usability,
        feedback:           formData.feedback,
        constraints:        formData.constraints,
        resources:          formData.resources,
        guidance:           formData.guidance,
        planning:           formData.planning,
        consistency:        formData.consistency,
        language:           formData.advisoryLang
      })
    });
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    const data = await response.json();
    displayResults(data.advisory);
  } catch (err) {
    console.error("Advisory fetch failed:", err);
    displayResults("Advisory service is currently unavailable. Based on a composite readiness score of " + formData.score + "/20 (" + formData.category + " category), engagement with district-level agricultural extension services and Krishi Vigyan Kendras is recommended.");
  }
}

// -----------------------------------------------
// DISPLAY RESULTS
// -----------------------------------------------
function displayResults(advisory) {
  const t = TRANSLATIONS[activeLang];
  document.getElementById("loadingState").classList.add("hidden");
  document.getElementById("resultContent").classList.remove("hidden");
  highlightArch("advisory");

  document.getElementById("resultName").textContent = `${formData.name}  ·  ${formData.advisoryLang}`;
  document.getElementById("scoreDisplay").textContent = `${formData.score} / 20`;

  // Sub-scores
  const dims = [
    { key: "xai_infra",     val: formData.resources  },
    { key: "xai_extension", val: formData.guidance   },
    { key: "xai_score",     val: formData.planning   },
    { key: "xai_usability", val: formData.consistency}
  ];
  document.getElementById("subScores").innerHTML = dims.map(d =>
    `<div class="sub-score-pill">${t[d.key] || d.key}: <span>${d.val}/5</span></div>`
  ).join("");

  setTimeout(() => { document.getElementById("scoreBar").style.width = ((formData.score / 20) * 100) + "%"; }, 200);

  const badge = document.getElementById("categoryBadge");
  badge.className = "category-badge " + formData.category.toLowerCase();
  // Translate badge text
  const catMap = { Low: t.score_low, Medium: t.score_med, High: t.score_high };
  badge.textContent = (catMap[formData.category] || formData.category) + " " + (t.xai_label ? "" : "Readiness");

  document.getElementById("langBadge").textContent = formData.advisoryLang;
  document.getElementById("sumDigitalExp").textContent  = formData.digitalExp;
  document.getElementById("sumConstraints").textContent = formData.constraints;
  document.getElementById("sumUsability").textContent   = formData.usability;
  document.getElementById("sumLang").textContent        = formData.advisoryLang;

  // Readiness interpretation
  const interpKey = { Low: "interp_low", Medium: "interp_med", High: "interp_high" }[formData.category];
  document.getElementById("readinessInterpretation").textContent = t[interpKey] || "";

  // Summary card labels — re-apply translation since these are static elements
  switchLanguage(activeLang);

  // Constraints list
  const constraintMap = {
    "Financial":         "Financial limitations restrict access to devices, connectivity, or paid agricultural platforms.",
    "Technology Access": "Limited device or internet access constrains engagement with digital extension services.",
    "Skill Gap":         "Digital literacy gap identified. Skill-building interventions are a prerequisite.",
    "Infrastructure":    "Poor rural infrastructure limits extension service delivery and digital access.",
    "Market Access":     "Limited market connectivity reduces incentive for digital advisory adoption.",
    "Language Barrier":  "Language or literacy barriers restrict access to extension content.",
    "None identified":   "No primary barrier identified. Conditions are relatively conducive for digital extension uptake.",
    "None":              "No primary barrier identified."
  };
  const usabilityNote = {
    "Very Difficult": "Perceived usability is very low — agent-mediated access is needed.",
    "Difficult":      "Perceived usability is low — structured orientation and support are recommended.",
    "Neutral":        "Perceived usability is moderate — guided familiarisation may improve engagement.",
    "Easy":           "Perceived usability is good — self-directed adoption is viable.",
    "Very Easy":      "Perceived usability is high — independent use and peer facilitation are feasible."
  };
  const cItems = [
    constraintMap[formData.constraints] || `Constraint: ${formData.constraints}`,
    usabilityNote[formData.usability]
  ].filter(Boolean);
  document.getElementById("constraintsList").innerHTML = cItems.map(c =>
    `<div class="constraint-item"><div class="constraint-dot"></div><div class="constraint-text">${c}</div></div>`
  ).join("");

  // Advisory paragraphs
  const paras = advisory.split(/\n+/).filter(p => p.trim());
  document.getElementById("advisoryText").innerHTML = paras.map(p =>
    `<p style="margin-bottom:12px;">${p.trim()}</p>`
  ).join("");

  // XAI
  document.getElementById("xaiContent").innerHTML = buildXAI(t).map(item =>
    `<div class="xai-item"><div class="xai-factor">${item.factor}</div><div class="xai-explanation">${item.explanation}</div></div>`
  ).join("");

  // Next steps
  const steps = buildNextSteps();
  document.getElementById("nextStepsContent").innerHTML = steps.map((s, i) =>
    `<div class="next-step-item"><div class="next-step-num">${i+1}</div><div class="next-step-text">${s}</div></div>`
  ).join("");

  // HITL
  document.getElementById("hitlContent").innerHTML = buildHITL().map(r =>
    `<div class="hitl-rec"><div class="hitl-icon">${r.icon}</div><div class="hitl-text">${r.text}</div></div>`
  ).join("");
}

// -----------------------------------------------
// XAI BUILDER
// -----------------------------------------------
function buildXAI(t) {
  const items = [];
  items.push({ factor: t.xai_score || "Score", explanation: `Composite readiness score of ${formData.score}/20 placed this assessment in the ${formData.category} readiness category, determining the intensity and type of interventions recommended.` });
  if (formData.resources <= 2) items.push({ factor: t.xai_infra || "Infrastructure", explanation: `Low digital infrastructure access (${formData.resources}/5) directed advisory toward low-bandwidth or agent-mediated extension solutions.` });
  else if (formData.resources >= 4) items.push({ factor: t.xai_infra || "Infrastructure", explanation: `Strong infrastructure access (${formData.resources}/5) enabled recommendations for app-based and platform-integrated extension tools.` });
  if (formData.guidance <= 2) items.push({ factor: t.xai_extension || "Extension Support", explanation: `Limited extension support (${formData.guidance}/5) increased emphasis on self-directed resources and government scheme connections.` });
  if (formData.constraints && formData.constraints !== "None identified" && formData.constraints !== "None")
    items.push({ factor: t.xai_constraint || "Constraint", explanation: `Identified constraint — '${formData.constraints}' — was incorporated. Recommendations were adapted to account for this structural barrier.` });
  if (formData.usability === "Difficult" || formData.usability === "Very Difficult")
    items.push({ factor: t.xai_usability || "Usability", explanation: "Reported low perceived usability triggered inclusion of accessibility-oriented and agent-assisted recommendations." });
  if (formData.feedback && formData.feedback.length > 10 && formData.feedback !== "No open-ended response provided")
    items.push({ factor: t.xai_openresponse || "Open Response", explanation: "The open-ended context response was incorporated into the AI prompt to personalise advisory framing beyond structured question responses." });
  if (formData.advisoryLang !== "English")
    items.push({ factor: t.xai_language || "Language", explanation: `Advisory generated in ${formData.advisoryLang} based on selected preference, to improve accessibility for the respondent.` });
  return items;
}

// -----------------------------------------------
// NEXT STEPS BUILDER
// -----------------------------------------------
function buildNextSteps() {
  const steps = {
    Low:    ["Engage with the nearest Krishi Vigyan Kendra (KVK) for structured digital literacy orientation.", "Register for PM-KISAN and verify eligibility for government-linked digital extension services.", "Begin with a single accessible tool — such as the Kisan Suvidha app — with agent-assisted onboarding.", "Identify a local digital champion or farmer peer group to support initial adoption."],
    Medium: ["Expand engagement with the eNAM platform for digital market price discovery and linkage.", "Attend district-level agricultural extension workshops focused on digital record-keeping and planning tools.", "Explore IFFCO Kisan and Agrimarket apps to complement existing advisory channels.", "Consolidate current tool usage before adopting additional platforms."],
    High:   ["Explore integration of IoT-based soil and weather sensing for precision agriculture applications.", "Consider a peer-facilitation role within local farmer groups to strengthen community-level digital extension.", "Engage with agri-fintech platforms for credit, insurance, and market linkage opportunities.", "Document adoption outcomes to contribute to local extension knowledge."]
  };
  return steps[formData.category] || steps["Medium"];
}

// -----------------------------------------------
// HITL BUILDER
// -----------------------------------------------
function buildHITL() {
  const recs = {
    Low:    [{ icon: "👤", text: "Agent-assisted onboarding is strongly recommended before self-directed digital tool use." }, { icon: "🏫", text: "Participation in extension-led digital literacy programmes at block or district level is a prerequisite." }, { icon: "📞", text: "Voice-based advisory services (Kisan Call Centre: 1800-180-1551) offer an accessible entry point." }],
    Medium: [{ icon: "👥", text: "Periodic extension advisory follow-up is recommended — quarterly check-ins with a KVK or field agent." }, { icon: "📱", text: "Extension-led group demonstration sessions for identified tools are recommended to address usability gaps." }, { icon: "📋", text: "A structured 3-month adoption plan, co-developed with an extension agent, is recommended." }],
    High:   [{ icon: "🔄", text: "Peer-to-peer extension facilitation is recommended — the respondent is a candidate to support lower-readiness farmers." }, { icon: "🌐", text: "Engagement with state-level agricultural technology missions and digital agriculture pilot programmes is appropriate." }, { icon: "📊", text: "Periodic self-assessment using this toolkit (every 6 months) is recommended to monitor readiness progression." }]
  };
  return recs[formData.category] || recs["Medium"];
}

// -----------------------------------------------
// TEXT-TO-SPEECH
// -----------------------------------------------
function readAdvisory() {
  if (!window.speechSynthesis) { alert("Text-to-speech is not supported in this browser."); return; }
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.getElementById("ttsBtn").setAttribute("data-i18n", "btn_tts");
    document.getElementById("ttsBtn").textContent = TRANSLATIONS[activeLang].btn_tts || "🔊 Read Advisory";
    return;
  }
  const text = document.getElementById("advisoryText")?.innerText || "";
  if (!text) return;
  ttsUtterance = new SpeechSynthesisUtterance(text);
  const langMap = { English: "en-IN", Telugu: "te-IN", Hindi: "hi-IN", Tamil: "ta-IN" };
  ttsUtterance.lang  = langMap[formData.advisoryLang] || "en-IN";
  ttsUtterance.rate  = 0.9;
  ttsUtterance.onstart = () => { document.getElementById("ttsBtn").textContent = "⏹ Stop"; };
  ttsUtterance.onend   = () => { document.getElementById("ttsBtn").textContent = TRANSLATIONS[activeLang].btn_tts || "🔊 Read Advisory"; };
  window.speechSynthesis.speak(ttsUtterance);
}

// -----------------------------------------------
// STAR RATING
// -----------------------------------------------
function setRating(val) {
  currentRating = val;
  document.querySelectorAll(".star").forEach((s, i) => s.classList.toggle("active", i < val));
  const labels = { en: ["","Not relevant","Somewhat relevant","Moderately relevant","Relevant","Highly relevant"], te: ["","సంబంధం లేదు","కొంత సంబంధం","మధ్యస్థ సంబంధం","సంబంధం","అత్యంత సంబంధం"], hi: ["","प्रासंगिक नहीं","कुछ हद तक प्रासंगिक","मध्यम प्रासंगिक","प्रासंगिक","अत्यधिक प्रासंगिक"], ta: ["","தொடர்பில்லை","சற்று தொடர்பு","மிதமான தொடர்பு","தொடர்பானது","மிகவும் தொடர்பானது"] };
  document.getElementById("ratingLabel").textContent = (labels[activeLang] || labels.en)[val] || "";
}

// -----------------------------------------------
// SUBMIT FEEDBACK
// -----------------------------------------------
function submitFeedback() {
  const implement   = document.querySelector('input[name="implement"]:checked');
  const supportText = document.getElementById("supportNeeded").value.trim();
  const record = {
    respondent: formData.name, score: formData.score, category: formData.category,
    language: formData.advisoryLang, rating: currentRating,
    wouldImplement: implement ? implement.value : "Not answered",
    supportNeeded: supportText || "None provided",
    submittedAt: new Date().toLocaleString()
  };
  const existing = JSON.parse(localStorage.getItem("agriReadinessFeedback") || "[]");
  existing.push(record);
  localStorage.setItem("agriReadinessFeedback", JSON.stringify(existing));
  highlightArch("feedback");
  document.getElementById("feedbackNode").classList.add("active");
  document.getElementById("feedbackForm").classList.add("hidden");
  document.getElementById("feedbackSubmitted").classList.remove("hidden");
}

// -----------------------------------------------
// RESET
// -----------------------------------------------
function resetAssessment() {
  if (window.speechSynthesis?.speaking) window.speechSynthesis.cancel();
  formData = { name: "", digitalExp: "", advisoryLang: "English", resources: 0, guidance: 0, planning: 0, consistency: 0, constraints: "", usability: "", feedback: "", score: 0, category: "" };
  currentRating = 0;
  document.getElementById("farmerName").value   = "";
  document.getElementById("advisoryLang").value = "English";
  document.querySelectorAll('input[name="digitalExp"]').forEach(r => r.checked = false);
  ["resources","guidance","planning","consistency","constraints","usability"].forEach(id => { document.getElementById(id).value = ""; });
  document.getElementById("feedback").value = "";
  document.getElementById("feedbackForm").classList.remove("hidden");
  document.getElementById("feedbackSubmitted").classList.add("hidden");
  document.querySelectorAll(".star").forEach(s => s.classList.remove("active"));
  document.querySelectorAll('input[name="implement"]').forEach(r => r.checked = false);
  const s = document.getElementById("supportNeeded"); if (s) s.value = "";
  document.getElementById("ratingLabel").textContent = TRANSLATIONS[activeLang].fb_not_rated || "Not rated";
  document.getElementById("scoreBar").style.width = "0%";
  document.getElementById("resultSection").classList.add("hidden");
  switchLanguage(activeLang);
  highlightArch("collection");
  goToSection(1);
}

// -----------------------------------------------
// SAVE
// -----------------------------------------------
function saveToLocal() {
  const toSave = { ...formData, savedAt: new Date().toLocaleString() };
  localStorage.setItem("agriReadinessData", JSON.stringify(toSave));
  alert(`Report saved for ${formData.name}.\nSaved: ${toSave.savedAt}`);
}

function scrollToTop() { window.scrollTo({ top: 0, behavior: "smooth" }); }
JSEOF
