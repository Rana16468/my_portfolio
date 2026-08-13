# 🎨 নতুন রঙ প্যালেট এবং Tailwind Classes - ব্যবহারের গাইড

## 📦 নতুন কালার সিস্টেম (Tailwind Config থেকে)

### 🔵 Primary Blue Colors (প্রধান নীল)
```
primary-50:   #f0f9ff  (খুবই হালকা)
primary-100:  #e0f2fe  (হালকা)
primary-200:  #bae6fd  (হালকা-মাঝারি)
primary-300:  #7dd3fc  (মাঝারি)
primary-400:  #38bdf8  (মাঝারি-গাঢ়)
primary-500:  #0ea5e9  (প্রধান - ব্যবহার করুন সবচেয়ে বেশি)
primary-600:  #0284c7  (গাঢ়)
primary-700:  #0369a1  (খুবই গাঢ়)
primary-800:  #075985  (অত্যন্ত গাঢ়)
primary-900:  #0c3d66  (অতি গাঢ়)
```

**কখন ব্যবহার করবেন:**
- primary-500: Main CTA buttons, links, highlights
- primary-600: Hover states, active states
- primary-200-300: Light backgrounds, borders
- primary-50-100: Subtle backgrounds

---

### ✨ Gold Accent Colors (স্বর্ণ)
```
gold-50:      #fffbeb
gold-100:     #fef3c7
gold-200:     #fde68a
gold-300:     #fcd34d
gold-400:     #fbbf24
gold-500:     #f59e0b  (প্রধান - accent color)
gold-600:     #d97706
gold-700:     #b45309  (গাঢ় gold)
gold-800:     #92400e
gold-900:     #78350f
```

**কখন ব্যবহার করবেন:**
- gold-500: Secondary accent, badges, special highlights
- gold-700: Hover on gold elements
- gold-100-200: Light gold backgrounds

---

### 🌑 Dark Theme Colors (গভীর রঙ)
```
dark-50:      #f9fafb
dark-100:     #f3f4f6
dark-200:     #e5e7eb
dark-300:     #d1d5db
dark-400:     #9ca3af
dark-500:     #6b7280
dark-600:     #4b5563
dark-700:     #374151
dark-800:     #1f2937
dark-900:     #111827
dark-950:     #030712
```

**কখন ব্যবহার করবেন:**
- Grayscale text, borders, dividers
- dark-200: Light borders
- dark-500: Secondary text
- dark-700-800: Dark elements

---

### 🏢 Background Colors (ব্যাকগ্রাউন্ড)
```
bg-primary:   #05080f  (মূল background - খুবই গভীর)
bg-secondary: #0a0e1a  (কার্ড background - কিছুটা হালকা)
bg-tertiary:  #0f1419  (তৃতীয় স্তর)
```

**ব্যবহার:**
```jsx
// ভিত্তি background
<div className="bg-bg-primary">...</div>

// কার্ড/সেকশন background
<div className="bg-bg-secondary rounded-xl">...</div>

// নেস্টেড এলিমেন্ট
<div className="bg-bg-tertiary">...</div>
```

---

### 📝 Text Colors (টেক্সট)
```
text-primary:    #e8eaf0  (মূল টেক্সট - সবচেয়ে বেশি ব্যবহার)
text-secondary:  #a8adb8  (সেকেন্ডারি টেক্সট, sub-headings)
text-muted:      #6b7280  (দুর্বল টেক্সট, hints)
```

**ব্যবহার:**
```jsx
// প্রধান টেক্সট (headings, paragraphs)
<h1 className="text-text-primary">...</h1>
<p className="text-text-primary">...</p>

// সেকেন্ডারি টেক্সট (sub-text, descriptions)
<p className="text-text-secondary">...</p>

// হিন্ট টেক্সট
<small className="text-text-muted">...</small>
```

---

## 🎯 ব্যবহারের উদাহরণ (Real-world scenarios):

### উদাহরণ #1: Button
```jsx
// Primary Button
<button className="
  px-6 py-2.5 
  bg-primary-500 
  text-white 
  rounded-lg 
  font-semibold
  hover:bg-primary-600
  active:scale-95
  shadow-lg
  hover:shadow-glow
">
  বাটন টেক্সট
</button>

// Secondary Button
<button className="
  px-6 py-2.5 
  bg-bg-secondary 
  text-text-primary
  rounded-lg 
  border border-primary-500/30
  hover:border-primary-500/60
  font-semibold
  active:scale-95
">
  সেকেন্ডারি
</button>
```

---

### উদাহরণ #2: Card
```jsx
<div className="
  bg-bg-secondary/50
  border border-primary-500/10
  rounded-xl
  p-6
  hover:border-primary-500/30
  hover:shadow-glow
  transition-all
  duration-300
">
  <h3 className="text-lg font-semibold text-text-primary">কার্ড টাইটেল</h3>
  <p className="mt-2 text-text-secondary">কার্ড বর্ণনা</p>
</div>
```

---

### উদাহরণ #3: Navigation
```jsx
<nav className="
  bg-bg-primary
  border-b border-primary-500/10
  backdrop-blur-md
">
  <div className="flex items-center justify-between px-6 py-4">
    <h1 className="text-2xl font-bold text-primary-500">পোর্টফোলিও</h1>
    <a href="#" className="text-text-secondary hover:text-primary-500">
      হোম
    </a>
  </div>
</nav>
```

---

### উদাহরণ #4: Section
```jsx
<section className="
  bg-bg-primary
  py-16 px-4
  sm:px-6 md:px-8
">
  <div className="max-w-4xl mx-auto">
    <h2 className="
      text-3xl md:text-4xl
      font-bold
      text-text-primary
      mb-8
    ">
      সেকশন টাইটেল
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* কার্ড আইটেম */}
      <div className="bg-bg-secondary/50 rounded-xl p-6">
        <p className="text-text-secondary">কন্টেন্ট</p>
      </div>
    </div>
  </div>
</section>
```

---

### উদাহরণ #5: Badge/Tag
```jsx
<span className="
  inline-flex
  items-center
  gap-2
  bg-primary-500/10
  border border-primary-500/30
  rounded-full
  px-3 py-1
  text-sm
  text-primary-500
  font-semibold
">
  React
</span>
```

---

### উদাহরণ #6: Gradient Text
```jsx
<h1 className="
  bg-gradient-to-r
  from-primary-400
  to-primary-500
  bg-clip-text
  text-transparent
  text-4xl
  font-bold
">
  গ্রেডিয়েন্ট টেক্সট
</h1>
```

---

### উদাহরণ #7: Glass Effect (আধুনিক)
```jsx
<div className="
  bg-bg-secondary/40
  backdrop-blur-md
  border border-primary-500/10
  rounded-xl
  p-6
  shadow-lg
">
  গ্লাস ইফেক্ট
</div>
```

---

## 📱 Responsive Design Pattern

```jsx
// Mobile first approach
<div className="
  px-4 py-6           // Mobile
  sm:px-6             // Small screens
  md:px-8 md:py-8     // Medium screens
  lg:px-12            // Large screens
  xl:px-16            // Extra large
">
  <h1 className="
    text-xl             // Mobile
    sm:text-2xl         // Small
    md:text-3xl         // Medium
    lg:text-4xl         // Large
    font-bold
    text-text-primary
  ">
    রেসপন্সিভ হেডিং
  </h1>
</div>
```

---

## 🔄 Old → New রঙের ম্যাপিং

| পুরাতন কোড | নতুন Tailwind Class |
|-----------|------------------|
| `style={{ background: "#05080f" }}` | `className="bg-bg-primary"` |
| `style={{ background: "#0a0e1a" }}` | `className="bg-bg-secondary"` |
| `style={{ color: "#0ea5e9" }}` | `className="text-primary-500"` |
| `style={{ color: "#c9a84c" }}` | `className="text-gold-500"` |
| `style={{ color: "#e8eaf0" }}` | `className="text-text-primary"` |
| `style={{ color: "#a8adb8" }}` | `className="text-text-secondary"` |
| `style={{ border: "1px solid rgba(...)" }}` | `className="border border-primary-500/10"` |

---

## ✨ সাধারণ Tailwind Classes Cheat Sheet

### Spacing (গ্যাপ, প্যাডিং, মার্জিন)
```
p-4   = padding 16px
px-4  = padding-left/right 16px
py-4  = padding-top/bottom 16px
m-4   = margin 16px
gap-4 = gap 16px
```

### Text
```
text-sm    = font-size 14px
text-base  = font-size 16px
text-lg    = font-size 18px
text-2xl   = font-size 24px
text-bold  = font-weight 700
leading-6  = line-height
```

### Layout
```
flex                = display flex
grid                = display grid
grid-cols-2         = 2 columns
gap-4               = gap between items
justify-between     = space-between
items-center        = vertical center
```

### Border & Shadow
```
border              = 1px solid
rounded-lg          = border-radius 8px
shadow-lg           = box-shadow large
hover:shadow-glow   = custom glow on hover
```

### Hover & Transition
```
hover:bg-primary-600    = color change on hover
active:scale-95         = scale down on click
transition-all          = smooth transition
duration-300            = 300ms timing
```

---

## 🚀 দ্রুত শুরু (Quick Start)

**আপনার পরবর্তী কম্পোনেন্ট এই টেমপ্লেট দিয়ে শুরু করুন:**

```jsx
export default function NewComponent() {
  return (
    <section className="bg-bg-primary py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* শিরোনাম */}
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
          আমার নতুন সেকশন
        </h2>

        {/* কন্টেন্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* কার্ড */}
          <div className="bg-bg-secondary/50 border border-primary-500/10 rounded-xl p-6 hover:border-primary-500/30 transition-all">
            <h3 className="text-lg font-semibold text-text-primary">কার্ড টাইটেল</h3>
            <p className="mt-2 text-text-secondary">কার্ড বর্ণনা</p>
          </div>
        </div>

        {/* বাটন */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600">
            প্রধান বাটন
          </button>
          <button className="px-6 py-2.5 bg-bg-secondary border border-primary-500/30 text-text-primary rounded-lg font-semibold hover:border-primary-500/60">
            সেকেন্ডারি
          </button>
        </div>
      </div>
    </section>
  );
}
```

---

**এখন আপনার প্রজেক্ট পেশাদার এবং সামঞ্জস্যপূর্ণ রঙ স্কিম ব্যবহার করছে! 🎉**
