# Contacts Management Dashboard – UI Specification

This document provides a comprehensive analysis and design specification for the **Contacts Management Dashboard** based on the Figma reference:
[Figma: Contacts Management Dashboard (by Shakir260)](https://www.figma.com/file/7fMi9iwHrMOz3taFMcZDVe/Contacts-Management-Dashboard-Free-Resource-Shakir260?node-id=0%3A1)
Reference image preserved at: `design/figma_design.png`

---

## 1. Overall Layout Architecture

The application layout is structured as an elegant, modern **Split-View Master-Detail Dashboard**:

```text
+----------------------------------------------------------------------------------------------------+
| LEFT PANE: CONTACT LIST (~40% width, min 380px, max 480px) | RIGHT PANE: DETAIL VIEW (~60% width)  |
|                                                            |                                      |
| [=] Contacts                                       [<] [>] |  [ Avatar ]   Johanna Stevens        |
|------------------------------------------------------------|               UI/UX Designer         |
| Search for a contact                                       |  [Message] [Call] [Meet] [...]       |
| Name, email or phone number                            [Q] |--------------------------------------|
|------------------------------------------------------------| Bio      When I first got into the...|
| [Avatar] Nicholas Gordon                    [#] [C] [...]  | Email    johanna.stevens@gmail.com   |
|          Developer                                         |          johanna.stevens@whiteui...  |
|                                                            | Dial     j.stevens@ymsg.com          |
| [Avatar] Bradley Malone                     [#] [C] [...]  | Meeting  http://go.betacall.com/...  |
|          Sales Manager                                     | Phone    439-582-1578                |
|                                                            |          621-770-7689                |
| [Avatar] Johanna Stevens (SELECTED)         [#] [C] [...]  | Social   [f] [p] [t] [in] [G]        |
|          Project Manager                                   |                                      |
+----------------------------------------------------------------------------------------------------+
```

### Key Dimensions & Breakpoints
- **Desktop (`>= 1024px`)**: Side-by-side fixed split pane. Left pane fixed width `420px` - `460px`, right pane flex `1`.
- **Tablet (`768px - 1023px`)**: Left pane `360px`, right pane flex `1`.
- **Mobile (`< 768px`)**: Stacked view with active view switcher. Showing contact list initially; selecting a contact smoothly transitions to detail view with a back navigation button (`← Back to contacts`).

---

## 2. Color Palette & Visual Design Tokens

| Token | Hex Value | Usage |
|---|---|---|
| `$primary-purple` | `#625BF7` | Primary buttons ("Message"), active icon accents, focused inputs |
| `$primary-purple-hover` | `#4F46E5` | Hover state for primary action buttons |
| `$primary-purple-light` | `#ECEAFD` / `#F4F3FF` | Active row background, active icon button backgrounds |
| `$text-dark` | `#1E2238` | Primary headings, contact names, values |
| `$text-secondary` | `#4A4F68` | Body text (Bio), secondary values |
| `$text-muted` | `#8F95B2` | Subtitles, job titles, section labels ("Bio", "Email", "Phone") |
| `$text-placeholder` | `#B0B4C8` | Input placeholder text, micro-labels |
| `$bg-page` | `#F8F9FC` | Application background behind cards |
| `$bg-card` | `#FFFFFF` | Card background, right detail panel background |
| `$bg-list` | `#FAFBFD` | Left pane contact list background |
| `$bg-badge` | `#F1F3F8` | Badges ("Primary" email and phone) |
| `$border-subtle` | `#ECEFF5` | Dividers, card borders, inactive action buttons |
| `$status-online` | `#22C55E` | Online availability indicator |
| `$status-away` | `#F59E0B` | Away availability indicator |
| `$status-offline` | `#94A3B8` | Offline availability indicator |

---

## 3. Typography Hierarchy

The UI uses Google Font **Inter**:

- **Header Title ("Contacts")**: `font-size: 20px`, `font-weight: 700`, `line-height: 1.2`, color: `#1E2238`
- **Search Micro-Label**: `font-size: 11px`, `font-weight: 500`, `text-transform: capitalize`, color: `#8F95B2`
- **Search Input Text**: `font-size: 14px`, `font-weight: 500`, color: `#1E2238`
- **Contact List Name**: `font-size: 14px`, `font-weight: 600`, color: `#1E2238`
- **Contact List Role**: `font-size: 12px`, `font-weight: 400`, color: `#8F95B2`
- **Detail Profile Name**: `font-size: 24px`, `font-weight: 700`, `line-height: 1.2`, color: `#1E2238`
- **Detail Profile Role**: `font-size: 14px`, `font-weight: 400`, color: `#8F95B2`
- **Section Labels ("Email", "Phone", etc.)**: `font-size: 13px`, `font-weight: 500`, color: `#8F95B2`
- **Section Values**: `font-size: 14px`, `font-weight: 400`, `line-height: 1.6`, color: `#1E2238`
- **Badge Text ("Primary")**: `font-size: 11px`, `font-weight: 600`, color: `#7E8299`

---

## 4. Component-by-Component Specifications

### A. Sidebar / Left Header
- **Menu Button**:
  - Size: `36px x 36px`
  - Border: `1px solid #ECEFF5`
  - Border radius: `8px`
  - Background: `#FFFFFF`
  - Icon: 3 horizontal bars (SVG)
- **Title**: "Contacts"
- **Pagination / Carousel Chevrons**:
  - Two buttons `<` and `>`: `36px x 36px`, `border: 1px solid #ECEFF5`, `border-radius: 8px`, `background: #FFFFFF`

### B. Search Bar
- **Position**: Below header divider
- **Layout**:
  - Top micro-label: "Search for a contact"
  - Input: Borderless text input with placeholder "Name, email or phone number"
  - Right icon: Search magnifying glass icon (`16px x 16px`), color: `#8F95B2`
  - Clear button (`×`) visible when search term is active

### C. Contact List Items
- **Dimensions**: Full width of left pane, `padding: 12px 24px`
- **Avatar**:
  - Squircle: `44px x 44px`, `border-radius: 12px`
  - Status indicator: `8px x 8px` circle at bottom right with white border (`border: 2px solid #FFFFFF`)
- **Quick Action Group (Right of each row)**:
  - 3 action buttons: Chat, Phone, Ellipsis
  - Size: `32px x 32px`, `border-radius: 8px`
  - Normal state: `border: 1px solid #ECEFF5`, `background: #FFFFFF`, icon color `#8F95B2`
  - Active/Selected state: `background: #ECEAFD`, `border: 1px solid transparent`, icon color `#625BF7`
- **Row States**:
  - **Normal**: Background transparent / `#FAFBFD`
  - **Hover**: Background `#F3F4FB`, cursor pointer
  - **Selected**: Background `#F4F3FF` or highlighted active buttons

### D. Contact Detail Panel
- **Profile Header**:
  - Avatar: `88px x 88px` squircle with `border-radius: 22px`, `object-fit: cover`
  - Name: `24px` bold
  - Role: `14px` muted
- **Action Buttons Bar**:
  - **"Message" Primary Button**:
    - `background: #625BF7`
    - `color: #FFFFFF`
    - `font-weight: 600`, `font-size: 14px`
    - `padding: 10px 22px`
    - `border-radius: 10px`
    - Left chat bubble icon (`16px`)
    - Shadow: `0 4px 14px rgba(98, 91, 247, 0.35)`
  - **Secondary Icon Buttons (Call, Meet, Ellipsis)**:
    - Size: `40px x 40px`
    - `border: 1px solid #ECEFF5`
    - `border-radius: 10px`
    - `background: #FFFFFF`
    - Icon color: `#7E8299`
    - Hover: `border-color: #625BF7`, `color: #625BF7`
- **Information Rows**:
  - 2-column layout: Label (`110px` width) and Content (flex `1`)
  - **Bio**: Multi-line description text with `line-height: 1.6`
  - **Email**:
    - Dynamically loaded from `GET /contacts/<id>/email_addresses`
    - Displays each email address
    - If `is_primary: true`, displays the `"Primary"` pill badge (`#F1F3F8` background, `#7E8299` text)
  - **Dial**: Clickable VoIP/messaging handle (`j.stevens@ymsg.com`)
  - **Meeting**: Clickable meeting URL (`http://go.betacall.com/meet/j.stevens`)
  - **Phone**:
    - List of phone numbers with `"Primary"` badge for the main number
  - **Social**:
    - Row of 5 squircle buttons: Facebook, Pinterest, Twitter, LinkedIn, Google
    - Size: `34px x 34px`, `border: 1px solid #ECEFF5`, `border-radius: 8px`
    - Hover: `border-color: #625BF7`, `color: #625BF7`

---

## 5. Micro-Interactions, Hover, and Empty States

- **Loading State**:
  - Skeleton shimmer pulse on contact list items and detail view while loading `GET /contacts` or `GET /contacts/<id>/email_addresses`.
- **Search Empty State**:
  - Displays a clean graphic/icon and message: "No contacts found matching '[term]'" with a "Clear Search" button.
- **Selection State**:
  - Instant selection with smooth fade-in of the detail panel.
- **Hover Transitions**:
  - Smooth 200ms ease transitions on buttons, row backgrounds, and social icons.

---

## 6. Zero Third-Party UI Library Strategy

To strictly obey the requirement *"Do NOT use Angular Material, PrimeNG, ng-bootstrap, third-party data-table libraries, or third-party pagination libraries"*:
- All components use native Angular standalone components.
- All styles are authored in custom Vanilla SCSS with CSS variables and responsive mixins.
- All icons are inline SVGs matching the Figma vector shapes.
