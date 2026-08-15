// ============================================================
// MKS College Bonafide Portal — shared client-side data layer
// Everything runs in the browser using localStorage (no server)
// ============================================================

const COURSES = ['INTERMEDIATE', 'DEGREE', 'POST GRADUATE'];

const DEPARTMENTS = {
  'DEGREE': ['BA', 'BSC', 'BCOM'],
  'INTERMEDIATE': ['ARTS', 'SCIENCE', 'COMMERCE'],
  'POST GRADUATE': ['MA', 'MSC', 'MCOM']
};

const AC_YEARS = {
  'DEGREE': ['1ST SEMESTER', '2ND SEMESTER', '3RD SEMESTER', '4TH SEMESTER', '5TH SEMESTER', '6TH SEMESTER'],
  'INTERMEDIATE': ['PART I', 'PART II'],
  'POST GRADUATE': ['1ST SEMESTER', '2ND SEMESTER', '3RD SEMESTER', '4TH SEMESTER']
};

const STATES = ["BIHAR","CHANDIGARH","CHHATTISGARH","DADRA AND NAGAR HAVELI","DAMAN AND DIU",
"NATIONAL CAPITAL TERRITORY OF DELHI","GOA","GUJARAT","HARYANA","HIMACHAL PRADESH",
"JAMMU AND KASHMIR","JHARKHAND","KARNATAKA","KERALA","LAKSHADWEEP","MADHYA PRADESH",
"MAHARASHTRA","MANIPUR","MEGHALAYA","MIZORAM","NAGALAND","ODISHA","PUDUCHERRY","PUNJAB",
"RAJASTHAN","SIKKIM","TAMIL NADU","TELANGANA","TRIPURA","UTTARAKHAND","WEST BENGAL",
"UTTAR PRADESH","ANDAMAN AND NICOBAR ISLANDS","ANDHRA PRADESH","ARUNACHAL PRADESH","ASSAM",
"OTHERS (NON-INDIAN)"];

const LS_STUDENTS = 'mks_students';
const LS_APPLICATIONS = 'mks_applications';

function getStudents() {
  try { return JSON.parse(localStorage.getItem(LS_STUDENTS)) || []; }
  catch (e) { return []; }
}
function saveStudents(arr) { localStorage.setItem(LS_STUDENTS, JSON.stringify(arr)); }

function getApplications() {
  try { return JSON.parse(localStorage.getItem(LS_APPLICATIONS)) || []; }
  catch (e) { return []; }
}
function saveApplications(arr) { localStorage.setItem(LS_APPLICATIONS, JSON.stringify(arr)); }

function findStudent(uregNo) {
  return getStudents().find(s => s.ureg_no === uregNo) || null;
}
function findApplication(uregNo) {
  const apps = getApplications().filter(a => a.reference_no === uregNo);
  return apps.length ? apps[apps.length - 1] : null;
}

// Generates reference numbers in the exact original pattern: 26B8806873
function genUregNo() {
  const yy = String(new Date().getFullYear()).slice(2);
  let ureg;
  const existing = getStudents().map(s => s.ureg_no);
  do {
    const rand = Math.floor(1000000 + Math.random() * 8999999);
    ureg = yy + 'B' + rand;
  } while (existing.includes(ureg));
  return ureg;
}

// Receipt no in exact original pattern: MKSC/DE/26-27/9066
function genReceiptNo() {
  const y1 = String(new Date().getFullYear()).slice(2);
  const y2 = String(Number(y1) + 1).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 8999);
  return `MKSC/DE/${y1}-${y2}/${rand}`;
}

// 14-digit numeric transaction id, matching original format
function genTransactionId() {
  let id = '1';
  for (let i = 0; i < 13; i++) id += Math.floor(Math.random() * 10);
  return id;
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = (str === undefined || str === null) ? '' : String(str);
  return d.innerHTML;
}

function qs(name) {
  return new URLSearchParams(window.location.search).get(name) || '';
}

// Converts a rupee amount to English words, e.g. 100 -> "One Hundred"
function amountInWords(num) {
  num = parseInt(num, 10) || 0;
  const ones = ['', 'One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
    'Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const tens = ['', '', 'Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  if (num === 0) return 'Zero';
  function chunk(n) {
    let w = '';
    if (n >= 100) { w += ones[Math.floor(n / 100)] + ' Hundred '; n %= 100; }
    if (n >= 20) { w += tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : ''); }
    else if (n > 0) { w += ones[n]; }
    return w.trim();
  }
  let words = '';
  if (num >= 10000000) { words += chunk(Math.floor(num / 10000000)) + ' Crore '; num %= 10000000; }
  if (num >= 100000) { words += chunk(Math.floor(num / 100000)) + ' Lakh '; num %= 100000; }
  if (num >= 1000) { words += chunk(Math.floor(num / 1000)) + ' Thousand '; num %= 1000; }
  words += chunk(num);
  return words.trim();
}

function todayDMY() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${d.getFullYear()}`;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
