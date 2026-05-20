# 钢琴机构管理App - Agent 线框图指南

## 项目简介
静态 HTML 线框图原型，模拟微信小程序风格的钢琴机构管理App。纯 HTML/CSS，无框架，附带 PPT 导出工具。

## 架构
- 所有文件在根目录（无 src/dist）
- `style.css` - 共享组件类（142行，**必须优先使用**）
- 每个 `*.html` = 自包含线框图，页内 `<style>` 覆盖局部样式
- `build-native.js` - 通过 pptxgenjs 生成 PPT
- 手机框宽度：**320px**，body 最小高度：**480px**

## 微信小程序约束
- 不自定义 topbar，右上角胶囊按钮（分享/关闭）由系统占用，头部右侧需留空避让
- 状态栏高度约 44px（含系统胶囊区），标题区在下方

## 页面结构模式
```html
<div class="phone">
  <div class="header">← 返回 | 标题 | 操作</div>
  <div class="body">...cards/content...</div>
  <div class="tabbar">5 tabs</div>
</div>
<div class="phone-label">状态描述</div>
```
每页可放多个 `.phone` 并排展示不同状态。

## 角色变体
3种角色：**管理员**(全机构数据)、**普通老师**(只看自己)、**学员**(只读)
- 老师 Tab：首页|课表|学员|通知|我的
- 学员 Tab：课表|课时|预约|通知|我的

## 设计色值
| 类别 | 值 |
|---|---|
| 主色 | `#2C5F8A`，渐变 `135deg, #2C5F8A→#4A90C4` |
| 成功 | `#52C41A`，底色 `#F6FFED` |
| 警告 | `#FAAD14/#FA8C16`，底色 `#FFF7E6/#FFFBE6` |
| 错误 | `#FF4D4F/#FA541C`，底色 `#FFF1F0` |
| 信息 | `#1677FF`，底色 `#E6F4FF` |
| 文字 | `#222/#333`(主) `#444`(正文) `#666/#888/#999`(辅) |
| 边框 | `#E8E8E8`，分割线 `#F0F0F0` |
| 背景 | 页面 `#F0F2F5`，body `#F8F9FA`，卡片 `#fff` |
| 圆角 | 手机框 24px，卡片/按钮/badge 10px，输入框 8px，头像 50%，药丸 16px |
| 字号 | 标题 17px，卡片 13px，辅助 11px，badge 10px，统计 22px |

## 关键 CSS 类（style.css）
手机框：`.phone`, `.phone-label`
头部：`.header`, `.header h1`, `.header .sub`, `.header .btn`, `.header .icon-btn`
内容：`.body`, `.card`, `.card-title`
统计：`.stat-row`, `.stat-card`, `.stat-num`, `.stat-warn`, `.stat-desc`
日历：`.calendar`, `.cal-day`, `.cal-day.active`
课程：`.lesson-item`, `.lesson-block`(+`.done/.absent/.cancelled`), `.dot`(+`.done/.absent/.cancelled`), `.lesson-name`, `.lesson-meta`
徽章：`.badge`, `.badge-warn/.done/.scheduled/.absent`
标签：`.tag`, `.tag-blue/.orange/.green/.red/.gray`
学员：`.student-item`, `.avatar`, `.student-name`, `.student-meta`, `.arrow`
表单：`.form-item`, `.form-label`, `.form-input`, `.form-select`, `.segment`, `.seg-item.active`
按钮：`.btn-primary`, `.btn-outline`, `.action-row`, `.action-btn`, `.action-done/.absent/.cancel`
通知：`.notif-item`, `.notif-title`, `.notif-meta`, `.unread-dot`
个人：`.profile-header`, `.profile-avatar`, `.profile-name`, `.profile-sub`
菜单：`.menu-item`, `.menu-icon`, `.menu-text`, `.menu-arrow`
课时：`.remaining-banner`, `.remaining-num`, `.remaining-label`, `.pkg-item`
区块：`.section-header`, `.section-title`, `.section-more`
Tab栏：`.tabbar`, `.tab`, `.tab .icon.active`, `.tab .lbl.active`, `.tab-badge`, `.tab-dot`

## Apple 风格升级指南
1. **字重对比**：细标签 vs 粗标题，增加 font-weight 对比度
2. **间距节奏**：卡片 padding 增至 16px，区块间 16px 垂直间距
3. **多层阴影**：用 `0 2px 8px rgba(0,0,0,0.08)` + `0 8px 24px rgba(0,0,0,0.12)` 替代硬边框
4. **圆角加大**：卡片 12-16px，按钮 12px，更圆润柔和
5. **背景色**：倾向 Apple 灰 `#F5F5F7`，头部加微妙渐变叠层
6. **玻璃态头部**：`backdrop-filter: blur(20px)` + 半透明背景
7. **交互过渡**：卡片 hover `transform: scale(1.02)`，`transition: all 0.2s ease`
8. **图标风格**：emoji 替换为 SF Symbol 风格单色图标（24px，`#2C5F8A`）
9. **列表触感**：触摸目标 48px 最小高度，微妙滑动提示
10. **弹窗动画**：背景模糊 + 上滑动画，圆角 20px

## 禁止事项
- 不引入 React/Vue 等任何框架
- 不拆分文件到 src/ 目录
- 不改变手机框宽度（320px）或 `.phone` 基础结构
- 不破坏已有 class 命名约定
- 不删除角色变体状态（管理员/老师/学员）
