const PptxGenJS = require('/Users/moksha/aiFirst/app/piano-wireframes/node_modules/pptxgenjs');

const BLUE = '2C5F8A';
const LIGHT_BLUE = 'EBF5FF';
const BG = 'F8F9FA';
const WHITE = 'FFFFFF';
const BORDER = 'E0E0E0';
const TEXT_DARK = '333333';
const TEXT_GRAY = '888888';
const GREEN = '52C41A';
const ORANGE = 'FAAD14';
const RED = 'FF4D4F';
const LIGHT_GREEN = 'F6FFED';

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';
pptx.title = '钢琴机构管理App - 页面线框图';

function addPhoneFrame(slide, x, y, w, h) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: WHITE },
    line: { color: '333333', width: 2 },
    rectRadius: 0.15,
  });
}

function addPhoneHeader(slide, x, y, w, title, subtitle) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x, y, w, h: 0.55,
    fill: { color: BLUE },
    line: { color: BLUE, width: 0 },
  });
  slide.addText(title, { x, y: y + 0.04, w, h: 0.28, fontSize: 11, bold: true, color: WHITE, align: 'left', margin: [0, 0, 0, 10] });
  if (subtitle) {
    slide.addText(subtitle, { x, y: y + 0.3, w, h: 0.2, fontSize: 7, color: 'AACCEE', align: 'left', margin: [0, 0, 0, 10] });
  }
}

function addPhoneFooter(slide, x, y, w, activeTab, tabs) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x, y, w, h: 0.45,
    fill: { color: WHITE },
    line: { color: BORDER, width: 1 },
  });
  const tabW = w / tabs.length;
  tabs.forEach((tab, i) => {
    const tx = x + i * tabW + tabW * 0.2;
    const isActive = i === activeTab;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: tx, y: y + 0.06, w: tabW * 0.6, h: 0.16,
      fill: { color: isActive ? BLUE : 'E0E0E0' },
      line: { color: isActive ? BLUE : 'E0E0E0', width: 0 },
      rectRadius: 0.04,
    });
    slide.addText(tab, { x: tx - 0.02, y: y + 0.25, w: tabW * 0.7, h: 0.14, fontSize: 5.5, color: isActive ? BLUE : TEXT_GRAY, align: 'center' });
  });
}

function addCard(slide, x, y, w, h, radius) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: WHITE },
    line: { color: BORDER, width: 1 },
    rectRadius: radius || 0.06,
  });
}

function addSectionHeader(slide, x, y, w, title) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h: 0.3,
    fill: { color: BLUE },
    line: { color: BLUE, width: 0 },
    rectRadius: 0.05,
  });
  slide.addText(title, { x, y, w, h: 0.3, fontSize: 9, bold: true, color: WHITE, align: 'left', margin: [0, 0, 0, 8] });
}

// ─────────────────────────────────────────────
// Slide 1: 老师端 首页 + 说明
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.63, fill: { color: BG }, line: { color: BG, width: 0 } });

  // slide title
  slide.addText('老师端 · 首页 Dashboard', { x: 3.1, y: 0.22, w: 6.6, h: 0.38, fontSize: 18, bold: true, color: BLUE });
  slide.addText('机构管理员/老师登录后看到的主要界面', { x: 3.1, y: 0.62, w: 6.6, h: 0.22, fontSize: 9, color: TEXT_GRAY });

  // Phone frame
  const px = 0.28, py = 0.3, pw = 2.2, ph = 4.8;
  addPhoneFrame(slide, px, py, pw, ph);
  addPhoneHeader(slide, px, py, pw, '首页', '星光钢琴机构');

  // stat cards
  const statY = py + 0.65;
  const statW = 0.6;
  const statLabels = [['5', '今日课程'], ['23', '学员总数'], ['3', '课时不足']];
  statLabels.forEach(([num, label], i) => {
    const sx = px + 0.1 + i * (statW + 0.08);
    addCard(slide, sx, statY, statW, 0.55);
    slide.addText(num, { x: sx, y: statY + 0.03, w: statW, h: 0.28, fontSize: 16, bold: true, color: i === 2 ? RED : BLUE, align: 'center' });
    slide.addText(label, { x: sx, y: statY + 0.3, w: statW, h: 0.18, fontSize: 6, color: TEXT_GRAY, align: 'center' });
  });

  // today's lessons label
  slide.addText('今日课程', { x: px + 0.1, y: statY + 0.65, w: 1.8, h: 0.2, fontSize: 8, bold: true, color: TEXT_DARK });

  // lesson items
  const lessons = [
    { name: '小明 · 钢琴基础', time: '14:00 - 14:45', badge: null },
    { name: '小红 · 考级班', time: '15:00 - 15:45', badge: '课时不足' },
    { name: '小李 · 钢琴基础', time: '18:00 - 18:45', badge: null },
  ];
  lessons.forEach((l, i) => {
    const ly = statY + 0.92 + i * 0.62;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: px + 0.1, y: ly, w: 0.07, h: 0.07, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.5 });
    slide.addText(l.name, { x: px + 0.22, y: ly - 0.02, w: 1.6, h: 0.2, fontSize: 7, bold: true, color: TEXT_DARK });
    slide.addText(l.time, { x: px + 0.22, y: ly + 0.16, w: 1.6, h: 0.16, fontSize: 6, color: TEXT_GRAY });
    if (l.badge) {
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: px + 1.5, y: ly, w: 0.58, h: 0.18, fill: { color: 'FFF3CD' }, line: { color: 'FFF3CD', width: 0 }, rectRadius: 0.08 });
      slide.addText(l.badge, { x: px + 1.5, y: ly, w: 0.58, h: 0.18, fontSize: 5.5, color: '856404', align: 'center' });
    }
    if (i < 2) slide.addShape(pptx.shapes.RECTANGLE, { x: px + 0.1, y: ly + 0.52, w: 1.9, h: 0.01, fill: { color: 'F0F0F0' }, line: { color: 'F0F0F0', width: 0 } });
  });

  addPhoneFooter(slide, px, py + ph - 0.45, pw, 0, ['首页', '课表', '学员', '通知', '我的']);
  slide.addText('老师端 · 首页', { x: px, y: py + ph + 0.08, w: pw, h: 0.18, fontSize: 7.5, color: TEXT_GRAY, align: 'center' });

  // right explanation
  const rx = 3.1, ry = 0.95;
  addSectionHeader(slide, rx, ry, 6.6, '页面模块说明');
  const items = [
    ['首页 Dashboard', '今日课程数、学员总数、课时不足学员数（红色高亮提醒）'],
    ['课表', '日历视图，按天展示课程，点击新增排课或查看课程详情'],
    ['学员', '学员列表，录入学员、查看详情、管理课时包'],
    ['通知', '发送机构公告，选择全体广播或指定老师的学员'],
    ['我的', '机构信息、数据导出 CSV、修改密码'],
  ];
  addCard(slide, rx, ry + 0.3, 6.6, 2.1);
  items.forEach(([title, desc], i) => {
    slide.addText([
      { text: title + '：', options: { bold: true, color: BLUE } },
      { text: desc, options: { color: TEXT_DARK } },
    ], { x: rx + 0.15, y: ry + 0.42 + i * 0.36, w: 6.3, h: 0.3, fontSize: 8.5 });
  });

  addSectionHeader(slide, rx, ry + 2.55, 6.6, 'TabBar 结构');
  addCard(slide, rx, ry + 2.85, 6.6, 0.35);
  slide.addText('首页  ·  课表  ·  学员  ·  通知  ·  我的', { x: rx + 0.15, y: ry + 2.9, w: 6.3, h: 0.25, fontSize: 9, color: TEXT_DARK });
}

// ─────────────────────────────────────────────
// Slide 2: 老师端 课表
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.63, fill: { color: BG }, line: { color: BG, width: 0 } });

  slide.addText('老师端 · 课表', { x: 3.1, y: 0.22, w: 6.6, h: 0.38, fontSize: 18, bold: true, color: BLUE });
  slide.addText('排课、签到的核心操作入口', { x: 3.1, y: 0.62, w: 6.6, h: 0.22, fontSize: 9, color: TEXT_GRAY });

  const px = 0.28, py = 0.3, pw = 2.2, ph = 4.8;
  addPhoneFrame(slide, px, py, pw, ph);
  addPhoneHeader(slide, px, py, pw, '课表', '');
  // + button
  slide.addShape(pptx.shapes.OVAL, { x: px + pw - 0.32, y: py + 0.12, w: 0.22, h: 0.22, fill: { color: WHITE }, line: { color: WHITE, width: 0 } });
  slide.addText('+', { x: px + pw - 0.32, y: py + 0.1, w: 0.22, h: 0.22, fontSize: 12, bold: true, color: BLUE, align: 'center' });

  // calendar week row
  const days = ['一', '二', '三', '四', '五', '六', '日'];
  const nums = ['7', '8', '9', '10', '11', '12', '13'];
  const activeDay = 3;
  const calY = py + 0.6;
  const dayW = (pw - 0.2) / 7;
  days.forEach((d, i) => {
    const dx = px + 0.1 + i * dayW;
    const isActive = i === activeDay;
    addCard(slide, dx, calY, dayW - 0.04, 0.42);
    if (isActive) {
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: dx, y: calY, w: dayW - 0.04, h: 0.42, fill: { color: BLUE }, line: { color: BLUE, width: 0 }, rectRadius: 0.05 });
    }
    slide.addText(d, { x: dx, y: calY + 0.02, w: dayW - 0.04, h: 0.16, fontSize: 5.5, color: isActive ? 'AACCEE' : TEXT_GRAY, align: 'center' });
    slide.addText(nums[i], { x: dx, y: calY + 0.18, w: dayW - 0.04, h: 0.2, fontSize: 8, bold: true, color: isActive ? WHITE : TEXT_DARK, align: 'center' });
  });

  // lesson blocks
  const lessonBlocks = [
    { name: '小明 · 钢琴基础', time: '14:00  已完成', color: GREEN, done: true },
    { name: '小红 · 考级班', time: '15:00  待上课', color: BLUE, done: false },
    { name: '小李 · 钢琴基础', time: '18:00  待上课', color: BLUE, done: false },
  ];
  lessonBlocks.forEach((b, i) => {
    const by = calY + 0.5 + i * 0.58;
    slide.addShape(pptx.shapes.RECTANGLE, { x: px + 0.1, y: by, w: 0.05, h: 0.42, fill: { color: b.color }, line: { color: b.color, width: 0 } });
    addCard(slide, px + 0.15, by, pw - 0.25, 0.42);
    slide.addText(b.name, { x: px + 0.22, y: by + 0.04, w: 1.65, h: 0.18, fontSize: 7, bold: true, color: b.done ? TEXT_GRAY : TEXT_DARK });
    slide.addText(b.time, { x: px + 0.22, y: by + 0.22, w: 1.65, h: 0.15, fontSize: 6, color: b.done ? GREEN : TEXT_GRAY });
  });

  addPhoneFooter(slide, px, py + ph - 0.45, pw, 1, ['首页', '课表', '学员', '通知', '我的']);
  slide.addText('老师端 · 课表', { x: px, y: py + ph + 0.08, w: pw, h: 0.18, fontSize: 7.5, color: TEXT_GRAY, align: 'center' });

  // right panel
  const rx = 3.1, ry = 0.95;
  addSectionHeader(slide, rx, ry, 6.6, '排课操作流程');
  addCard(slide, rx, ry + 0.3, 6.6, 2.0);
  const steps = [
    '点击右上角 + 新增课程，选择单次课或周期课',
    '填写学员、课程模板、上课时间；周期课额外填重复周数',
    '点击课程卡片进入详情，操作签到 / 缺席 / 取消',
    '签到后自动扣除课时包，课时不足时推送提醒给学员',
  ];
  steps.forEach((s, i) => {
    const sy = ry + 0.42 + i * 0.44;
    slide.addShape(pptx.shapes.OVAL, { x: rx + 0.15, y: sy + 0.02, w: 0.22, h: 0.22, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
    slide.addText(`${i + 1}`, { x: rx + 0.15, y: sy + 0.02, w: 0.22, h: 0.22, fontSize: 7.5, bold: true, color: WHITE, align: 'center' });
    slide.addText(s, { x: rx + 0.44, y: sy, w: 6.0, h: 0.3, fontSize: 8.5, color: TEXT_DARK });
  });

  addSectionHeader(slide, rx, ry + 2.45, 6.6, '课程状态');
  addCard(slide, rx, ry + 2.75, 6.6, 0.4);
  const statuses = [['待上课', BLUE], ['已完成', GREEN], ['缺席', ORANGE], ['已取消', RED]];
  statuses.forEach(([label, color], i) => {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: rx + 0.15 + i * 1.58, y: ry + 2.85, w: 1.35, h: 0.22, fill: { color }, line: { color, width: 0 }, rectRadius: 0.06 });
    slide.addText(label, { x: rx + 0.15 + i * 1.58, y: ry + 2.85, w: 1.35, h: 0.22, fontSize: 8, bold: true, color: WHITE, align: 'center' });
  });
}

// ─────────────────────────────────────────────
// Slide 3: 老师端 学员详情
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.63, fill: { color: BG }, line: { color: BG, width: 0 } });

  slide.addText('老师端 · 学员详情', { x: 3.1, y: 0.22, w: 6.6, h: 0.38, fontSize: 18, bold: true, color: BLUE });
  slide.addText('管理学员课时包、查看上课历史', { x: 3.1, y: 0.62, w: 6.6, h: 0.22, fontSize: 9, color: TEXT_GRAY });

  const px = 0.28, py = 0.3, pw = 2.2, ph = 4.8;
  addPhoneFrame(slide, px, py, pw, ph);
  addPhoneHeader(slide, px, py, pw, '小红', '学员详情');

  // info card
  const icy = py + 0.62;
  addCard(slide, px + 0.1, icy, pw - 0.2, 0.52);
  slide.addText('手机号', { x: px + 0.18, y: icy + 0.06, w: 0.6, h: 0.16, fontSize: 6.5, color: TEXT_GRAY });
  slide.addText('138****5678', { x: px + 0.85, y: icy + 0.06, w: 1.1, h: 0.16, fontSize: 7, bold: true, color: TEXT_DARK, align: 'right' });
  slide.addText('课程', { x: px + 0.18, y: icy + 0.28, w: 0.6, h: 0.16, fontSize: 6.5, color: TEXT_GRAY });
  slide.addText('考级班', { x: px + 0.85, y: icy + 0.28, w: 1.1, h: 0.16, fontSize: 7, bold: true, color: TEXT_DARK, align: 'right' });

  // remaining big
  const rby = icy + 0.6;
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: px + 0.1, y: rby, w: pw - 0.2, h: 0.65, fill: { color: LIGHT_BLUE }, line: { color: LIGHT_BLUE, width: 0 }, rectRadius: 0.06 });
  slide.addText('3', { x: px + 0.1, y: rby + 0.04, w: pw - 0.2, h: 0.36, fontSize: 24, bold: true, color: BLUE, align: 'center' });
  slide.addText('剩余课时', { x: px + 0.1, y: rby + 0.42, w: pw - 0.2, h: 0.18, fontSize: 7, color: TEXT_GRAY, align: 'center' });

  // history
  slide.addText('上课历史', { x: px + 0.1, y: rby + 0.72, w: 1.8, h: 0.18, fontSize: 7, bold: true, color: TEXT_DARK });
  const records = [
    ['考级班', '04-10  15:00'],
    ['考级班', '04-03  15:00'],
    ['考级班', '03-27  15:00'],
  ];
  records.forEach(([name, date], i) => {
    const hy = rby + 0.96 + i * 0.5;
    slide.addText(name, { x: px + 0.18, y: hy, w: 1.0, h: 0.18, fontSize: 7, bold: true, color: TEXT_DARK });
    slide.addText(date, { x: px + 0.18, y: hy + 0.18, w: 1.0, h: 0.14, fontSize: 6, color: TEXT_GRAY });
    slide.addText('-1', { x: px + 1.5, y: hy + 0.04, w: 0.5, h: 0.2, fontSize: 8, bold: true, color: RED, align: 'right' });
    if (i < 2) slide.addShape(pptx.shapes.RECTANGLE, { x: px + 0.1, y: hy + 0.44, w: pw - 0.2, h: 0.01, fill: { color: 'F0F0F0' }, line: { color: 'F0F0F0', width: 0 } });
  });

  slide.addText('老师端 · 学员详情', { x: px, y: py + ph + 0.08, w: pw, h: 0.18, fontSize: 7.5, color: TEXT_GRAY, align: 'center' });

  // right panel
  const rx = 3.1, ry = 0.95;
  addSectionHeader(slide, rx, ry, 3.1, '老师端 · 学员详情');
  addCard(slide, rx, ry + 0.3, 3.1, 1.7);
  ['基本信息（姓名/手机号）', '剩余课时（大号数字突出展示）', '课时包列表（新增/编辑）', '上课历史记录'].forEach((t, i) => {
    slide.addText('· ' + t, { x: rx + 0.15, y: ry + 0.42 + i * 0.38, w: 2.8, h: 0.3, fontSize: 8.5, color: TEXT_DARK });
  });

  addSectionHeader(slide, rx + 3.3, ry, 3.1, '学员端 · 课时页面');
  addCard(slide, rx + 3.3, ry + 0.3, 3.1, 1.7);
  ['剩余课时展示', '课时包详情（总量/剩余/到期日）', '扣课时历史记录'].forEach((t, i) => {
    slide.addText('· ' + t, { x: rx + 3.45, y: ry + 0.42 + i * 0.38, w: 2.8, h: 0.3, fontSize: 8.5, color: TEXT_DARK });
  });

  addSectionHeader(slide, rx, ry + 2.15, 6.6, '课时不足提醒触发逻辑');
  addCard(slide, rx, ry + 2.45, 6.6, 0.5);
  slide.addText([
    { text: '签到完成', options: { color: BLUE, bold: true } },
    { text: '  →  扣课时  →  ', options: { color: TEXT_DARK } },
    { text: '剩余 ≤ 阈值（默认3节）', options: { color: RED, bold: true } },
    { text: '  →  微信订阅消息推送给学员', options: { color: TEXT_DARK } },
  ], { x: rx + 0.15, y: ry + 2.55, w: 6.3, h: 0.3, fontSize: 9 });
}

// ─────────────────────────────────────────────
// Slide 4: 学员端
// ─────────────────────────────────────────────
{
  const slide = pptx.addSlide();
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 5.63, fill: { color: BG }, line: { color: BG, width: 0 } });

  slide.addText('学员端页面', { x: 4.7, y: 0.22, w: 5.0, h: 0.38, fontSize: 18, bold: true, color: BLUE });
  slide.addText('学员登录后的只读视角', { x: 4.7, y: 0.62, w: 5.0, h: 0.22, fontSize: 9, color: TEXT_GRAY });

  // Phone 1: 课表
  const p1x = 0.28, py = 0.3, pw = 2.0, ph = 4.8;
  addPhoneFrame(slide, p1x, py, pw, ph);
  addPhoneHeader(slide, p1x, py, pw, '我的课表', '学员视角');

  // remaining banner
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: p1x + 0.1, y: py + 0.62, w: pw - 0.2, h: 0.65, fill: { color: LIGHT_BLUE }, line: { color: LIGHT_BLUE, width: 0 }, rectRadius: 0.06 });
  slide.addText('8', { x: p1x + 0.1, y: py + 0.64, w: 0.8, h: 0.36, fontSize: 22, bold: true, color: BLUE, align: 'center' });
  slide.addText('剩余课时', { x: p1x + 0.1, y: py + 0.98, w: 0.8, h: 0.18, fontSize: 6, color: TEXT_GRAY, align: 'center' });
  slide.addText('到期：2024-12-31', { x: p1x + 0.95, y: py + 0.82, w: 0.85, h: 0.18, fontSize: 6, color: TEXT_GRAY, align: 'right' });

  // schedule items
  const sItems = ['钢琴基础 · 周四 18:00', '考级班 · 周六 10:00'];
  sItems.forEach((s, i) => {
    const sy = py + 1.38 + i * 0.56;
    slide.addShape(pptx.shapes.RECTANGLE, { x: p1x + 0.1, y: sy, w: 0.04, h: 0.4, fill: { color: BLUE }, line: { color: BLUE, width: 0 } });
    addCard(slide, p1x + 0.14, sy, pw - 0.24, 0.4);
    slide.addText(s, { x: p1x + 0.22, y: sy + 0.04, w: 1.55, h: 0.18, fontSize: 7, bold: true, color: TEXT_DARK });
    slide.addText('下次：2024-04-' + (11 + i * 2), { x: p1x + 0.22, y: sy + 0.22, w: 1.55, h: 0.14, fontSize: 6, color: TEXT_GRAY });
  });

  addPhoneFooter(slide, p1x, py + ph - 0.45, pw, 0, ['课表', '课时', '通知', '我的']);
  slide.addText('学员端 · 课表', { x: p1x, y: py + ph + 0.08, w: pw, h: 0.18, fontSize: 7.5, color: TEXT_GRAY, align: 'center' });

  // Phone 2: 通知
  const p2x = 2.55;
  addPhoneFrame(slide, p2x, py, pw, ph);
  addPhoneHeader(slide, p2x, py, pw, '通知', '机构消息');

  const notifs = [
    { title: '五一放假通知', time: '04-10  · 星光钢琴', unread: true },
    { title: '课时不足提醒', time: '04-08  · 系统消息', unread: false },
    { title: '上课提醒', time: '04-07  · 系统消息', unread: false },
  ];
  notifs.forEach((n, i) => {
    const ny = py + 0.65 + i * 0.68;
    addCard(slide, p2x + 0.1, ny, pw - 0.2, 0.56);
    if (n.unread) {
      slide.addShape(pptx.shapes.OVAL, { x: p2x + pw - 0.26, y: ny + 0.1, w: 0.12, h: 0.12, fill: { color: RED }, line: { color: RED, width: 0 } });
    }
    slide.addText(n.title, { x: p2x + 0.18, y: ny + 0.08, w: 1.5, h: 0.2, fontSize: 7.5, bold: true, color: TEXT_DARK });
    slide.addText(n.time, { x: p2x + 0.18, y: ny + 0.3, w: 1.5, h: 0.16, fontSize: 6, color: TEXT_GRAY });
  });

  addPhoneFooter(slide, p2x, py + ph - 0.45, pw, 2, ['课表', '课时', '通知', '我的']);
  slide.addText('学员端 · 通知', { x: p2x, y: py + ph + 0.08, w: pw, h: 0.18, fontSize: 7.5, color: TEXT_GRAY, align: 'center' });

  // right explanation
  const rx = 4.75, ry = 0.95;
  addSectionHeader(slide, rx, ry, 4.95, 'TabBar 结构');
  addCard(slide, rx, ry + 0.3, 4.95, 0.32);
  slide.addText('课表  ·  课时  ·  通知  ·  我的', { x: rx + 0.15, y: ry + 0.33, w: 4.65, h: 0.24, fontSize: 9, color: TEXT_DARK });

  addSectionHeader(slide, rx, ry + 0.78, 4.95, '各页面功能');
  addCard(slide, rx, ry + 1.08, 4.95, 2.5);
  const cols = [
    ['课表', ['剩余课时 + 到期日', '即将上课的课程列表']],
    ['课时', ['课时包详情', '扣课时历史记录']],
    ['通知', ['机构公告', '系统自动提醒', '未读红点']],
    ['我的', ['个人信息', '修改密码']],
  ];
  cols.forEach(([title, items], ci) => {
    const cx = rx + 0.15 + ci * 1.18;
    slide.addText(title, { x: cx, y: ry + 1.18, w: 1.1, h: 0.22, fontSize: 9, bold: true, color: BLUE });
    items.forEach((item, ii) => {
      slide.addText('· ' + item, { x: cx, y: ry + 1.44 + ii * 0.32, w: 1.1, h: 0.26, fontSize: 7.5, color: TEXT_DARK });
    });
  });
}

pptx.writeFile({ fileName: '/Users/moksha/aiFirst/app/piano-wireframes/piano-wireframes.pptx' })
  .then(() => console.log('Done! -> piano-wireframes.pptx'))
  .catch(console.error);
