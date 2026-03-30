// src/pages/home/Home.jsx
import { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { useTheme } from "../../context/ThemeContext";
import { membersDB } from "../../database/members";
import {
  sortByFollowers, sortByRating, sortByName,
  getTotalFollowers, getAverageRating,
  findMemberById, hasMegaInfluencer, allHaveEmail,
  getMemberKeys, updateMember, removeSensitiveData,
} from "./homeUtils";
import {
  formatRole, normalizeSearch, cleanInput,
  searchIncludes, truncateBio, parseTags,
  maskEmail, isValidUsername, capitalize, formatId, formatSummary,
} from "../../utils/stringUtils";

// ── Fetch random users from API to extend our DB ──────────────────────────────
const useRandomUsers = () => {
  const [apiUsers, setApiUsers] = useState([]);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=4&nat=pk")
      .then((r) => r.json())
      .then((data) => {
        const mapped = data.results.map((u, i) => ({
          id:         100 + i,
          name:       `${capitalize(u.name.first)} ${capitalize(u.name.last)}`,
          username:   `@${u.login.username}`,
          email:      u.email,
          age:        u.dob.age,
          role:       ["Designer","Developer","Student","Creator"][i % 4],
          city:       u.location.city,
          country:    "Pakistan",
          verified:   i % 2 === 0,
          posts:      Math.floor(Math.random() * 200) + 10,
          followers:  Math.floor(Math.random() * 8000) + 100,
          following:  Math.floor(Math.random() * 400) + 50,
          bio:        truncateBio(u.login.uuid, 50),
          joinedDate: u.registered.date.slice(0, 10),
          avatar:     u.picture.large,
          tags:       ["React","Design","Code"].slice(0, (i % 3) + 1),
          rating:     parseFloat((Math.random() * 2 + 3).toFixed(1)),
        }));
        setApiUsers(mapped);
      })
      .catch(() => {});
  }, []);
  return apiUsers;
};

const GRADIENTS = [
  "from-cyan-500 to-blue-600","from-purple-500 to-pink-600",
  "from-green-500 to-teal-600","from-orange-500 to-red-500",
  "from-yellow-500 to-amber-500","from-indigo-500 to-violet-600",
  "from-rose-500 to-pink-500","from-emerald-500 to-green-600",
];

const EMPTY_FORM = {
  name:"", username:"", email:"", age:"", role:"",
  city:"", bio:"", posts:"", followers:"", following:"",
  tags:"", rating:"", verified: false,
};

const ROLES = ["All","UI Designer","Full Stack Dev","Student","Content Creator","Marketing","DevOps Engineer"];
const CITIES = ["All","Lahore","Karachi","Islamabad","Peshawar","Multan"];
const SORT_OPTIONS = [
  { value:"default",   label:"Default"         },
  { value:"followers", label:"Most Followers"  },
  { value:"rating",    label:"Top Rated"       },
  { value:"name",      label:"Name A–Z"        },
];

// ── Hero Section ──────────────────────────────────────────────────────────────
function Hero({ isDark, stats }) {
  const bg    = isDark ? "bg-gray-950" : "bg-slate-50";
  const text  = isDark ? "text-white"  : "text-slate-900";
  const sub   = isDark ? "text-gray-400" : "text-slate-500";

  return (
    <section className={`relative overflow-hidden ${bg} py-24 px-6`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Now in Beta — Join for free
        </span>
        <h1 className={`text-5xl md:text-7xl font-black leading-tight mb-6 ${text}`} style={{ fontFamily:"'Syne',sans-serif" }}>
          Connect. Share.{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Belong.</span>
        </h1>
        <p className={`${sub} text-xl max-w-2xl mx-auto mb-10 leading-relaxed`}>
          FaceApp is a next-generation social platform built for meaningful connections. Discover people, share stories, and build your digital identity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a href="/signup" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl shadow-cyan-500/25 text-sm">
            Get Started Free →
          </a>
          <a href="/about" className={`px-8 py-4 border font-semibold rounded-xl transition-all text-sm ${isDark ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"}`}>
            Learn More
          </a>
        </div>
        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
          {[
            ["Members", stats.total],
            ["Followers", (stats.totalFollowers/1000).toFixed(0)+"K"],
            ["Avg Rating", stats.avgRating+"★"],
          ].map(([label, val]) => (
            <div key={label} className="text-center">
              <div className={`text-3xl font-black ${text}`}>{val}</div>
              <div className={`${sub} text-sm mt-1`}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features Section ──────────────────────────────────────────────────────────
function Features({ isDark }) {
  const card = isDark ? "bg-gray-900 border-gray-800 hover:border-cyan-500/30" : "bg-white border-slate-200 hover:border-cyan-400";
  const text = isDark ? "text-white" : "text-slate-900";
  const sub  = isDark ? "text-gray-500" : "text-slate-500";

  const features = [
    { icon:"🔒", title:"Private & Secure",    desc:"End-to-end encryption keeps your conversations safe." },
    { icon:"⚡", title:"Lightning Fast",       desc:"Optimized for performance. Load in under 200ms." },
    { icon:"🌍", title:"Global Community",    desc:"Connect with people from 150+ countries worldwide." },
    { icon:"🎨", title:"Fully Customizable",  desc:"Personalize your profile, themes, and layout." },
    { icon:"📱", title:"Mobile First",        desc:"Seamless experience across all devices." },
    { icon:"🤖", title:"AI Powered",          desc:"Smart recommendations powered by AI." },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className={`text-3xl font-black ${text} mb-2 text-center`} style={{ fontFamily:"'Syne',sans-serif" }}>Why FaceApp?</h2>
      <p className={`${sub} text-center mb-10`}>Everything you need in one platform</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon, title, desc }) => (
          <div key={title} className={`${card} border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 transition-colors ${isDark ? "bg-gray-800 group-hover:bg-cyan-500/10" : "bg-slate-100 group-hover:bg-cyan-50"}`}>{icon}</div>
            <h3 className={`${text} font-bold mb-2`}>{title}</h3>
            <p className={`${sub} text-sm leading-relaxed`}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Add Form — separate component to prevent focus loss on re-render ─────────
function AddForm({ isDark, form, setForm, formErrors, onAdd, onCancel }) {
  const muted = isDark ? "text-gray-500" : "text-slate-400";
  const text  = isDark ? "text-white"    : "text-slate-900";
  const inp   = isDark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500"
    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500";
  const filterBar = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200";
  const sub   = isDark ? "text-gray-400" : "text-slate-600";

  const change = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const fields = [
    { key:"name",      label:"Full Name *",  type:"text"   },
    { key:"username",  label:"Username",     type:"text"   },
    { key:"email",     label:"Email",        type:"email"  },
    { key:"age",       label:"Age *",        type:"number" },
    { key:"role",      label:"Role *",       type:"text"   },
    { key:"city",      label:"City *",       type:"text"   },
    { key:"posts",     label:"Posts",        type:"number" },
    { key:"followers", label:"Followers",    type:"number" },
    { key:"rating",    label:"Rating (1-5)", type:"number" },
  ];

  return (
    <div className={`${filterBar} border rounded-2xl p-6 mb-6`}>
      <h3 className={`${text} font-bold mb-5`}>Add New Member</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {fields.map(({ key, label, type }) => (
          <div key={key}>
            <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider ${muted}`}>{label}</label>
            <input
              type={type}
              value={form[key]}
              onChange={(e) => change(key, e.target.value)}
              placeholder={label.replace(" *", "")}
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${inp} ${formErrors[key] ? "border-red-500" : ""}`}
            />
            {formErrors[key] && <p className="text-red-400 text-xs mt-1">{formErrors[key]}</p>}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider ${muted}`}>Bio</label>
        <textarea
          value={form.bio}
          onChange={(e) => change("bio", e.target.value)}
          rows={2}
          placeholder="Short bio..."
          className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none transition-colors ${inp}`}
        />
      </div>
      <div className="mb-4">
        <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider ${muted}`}>Tags (comma separated)</label>
        <input
          value={form.tags}
          onChange={(e) => change("tags", e.target.value)}
          placeholder="React, Design, Node"
          className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${inp}`}
        />
      </div>
      <div className="flex items-center gap-3 mb-5">
        <input type="checkbox" id="addVerified" checked={form.verified}
          onChange={(e) => change("verified", e.target.checked)} className="accent-cyan-500 w-4 h-4" />
        <label htmlFor="addVerified" className={`text-sm ${sub}`}>Verified user</label>
      </div>
      <div className="flex gap-3">
        <button onClick={onAdd}
          className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold rounded-xl transition-colors">
          Add Member
        </button>
        <button onClick={onCancel}
          className={`px-6 py-2.5 rounded-xl text-sm transition-colors ${isDark ? "bg-gray-800 text-gray-400 hover:bg-gray-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main CRUD Community Section ───────────────────────────────────────────────
function CommunitySection({ isDark, members, setMembers }) {
  const [search, setSearch]               = useState("");
  const [filterRole, setFilterRole]       = useState("All");
  const [filterCity, setFilterCity]       = useState("All");
  const [filterVerified, setFilterVerified] = useState("All");
  const [filterMinFollowers, setFilterMinFollowers] = useState("All");
  const [filterMinRating, setFilterMinRating]       = useState("All");
  const [sortBy, setSortBy]               = useState("default");
  const [showAdd, setShowAdd]             = useState(false);
  const [form, setForm]                   = useState(EMPTY_FORM);
  const [editMember, setEditMember]       = useState(null);
  const [formErrors, setFormErrors]       = useState({});
  const [infoMember, setInfoMember]       = useState(null);

  const card  = isDark ? "bg-gray-900 border-gray-800 hover:border-cyan-500/30" : "bg-white border-slate-200 hover:border-cyan-400";
  const text  = isDark ? "text-white"   : "text-slate-900";
  const sub   = isDark ? "text-gray-400" : "text-slate-600";
  const muted = isDark ? "text-gray-500" : "text-slate-400";
  const inp   = isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500";
  const sel   = isDark ? "bg-gray-800 border-gray-700 text-gray-300 focus:border-cyan-500" : "bg-white border-slate-300 text-slate-700 focus:border-cyan-500";
  const filterBar = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200";
  const modal = isDark ? "bg-gray-900 border-gray-700" : "bg-white border-slate-200";

  // ── String Methods applied on filter/search ───────────────────────────────
  const applyFilters = (list) => {
    let result = list.filter((m) => {
      // String method: searchIncludes (includes + toLowerCase)
      const matchName     = search === "" || searchIncludes(m.name, cleanInput(search));
      // String method: normalizeSearch
      const matchUsername = search === "" || normalizeSearch(m.username).includes(normalizeSearch(search));
      const matchSearch   = matchName || matchUsername;
      const matchRole     = filterRole === "All"      || m.role === filterRole;
      const matchCity     = filterCity === "All"      || m.city === filterCity;
      const matchVerified = filterVerified === "All"  || (filterVerified === "Verified" ? m.verified : !m.verified);
      const matchFollowers = filterMinFollowers === "All" || m.followers >= Number(filterMinFollowers);
      const matchRating   = filterMinRating === "All" || m.rating >= Number(filterMinRating);
      return matchSearch && matchRole && matchCity && matchVerified && matchFollowers && matchRating;
    });

    // arr.sort()
    if (sortBy === "followers") result = sortByFollowers(result);
    else if (sortBy === "rating") result = sortByRating(result);
    else if (sortBy === "name")   result = sortByName(result);
    return result;
  };

  const filtered = applyFilters(members);

  // ── Validate form ─────────────────────────────────────────────────────────
  const validateForm = (f) => {
    const errors = {};
    // String method: cleanInput (trim)
    if (!cleanInput(f.name))     errors.name = "Name required";
    if (!cleanInput(f.role))     errors.role = "Role required";
    if (!cleanInput(f.city))     errors.city = "City required";
    if (!f.age || isNaN(f.age))  errors.age  = "Valid age required";
    // String method: isValidUsername (startsWith)
    if (f.username && !isValidUsername(f.username)) errors.username = "Must start with @";
    return errors;
  };

  // ── CRUD: Add ─────────────────────────────────────────────────────────────
  const handleAdd = () => {
    const errors = validateForm(form);
    if (Object.keys(errors).length) { setFormErrors(errors); return; }

    const newMember = {
      id:        Date.now(),
      // String method: cleanInput (trim), capitalize
      name:      capitalize(cleanInput(form.name)),
      username:  form.username || `@${normalizeSearch(cleanInput(form.name)).replace(" ", ".")}`,
      email:     form.email || `${normalizeSearch(cleanInput(form.name)).replace(" ",".")}@faceapp.com`,
      age:       Number(form.age),
      role:      cleanInput(form.role),
      city:      capitalize(cleanInput(form.city)),
      country:   "Pakistan",
      verified:  form.verified,
      posts:     Number(form.posts) || 0,
      followers: Number(form.followers) || 0,
      following: Number(form.following) || 0,
      bio:       cleanInput(form.bio) || "New FaceApp member.",
      joinedDate: new Date().toISOString().slice(0, 10),
      // String method: parseTags (split)
      tags:      parseTags(form.tags || ""),
      rating:    parseFloat(form.rating) || 3.5,
      avatar:    `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name}`,
    };

    // Array.push() equivalent
    setMembers((prev) => [...prev, newMember]);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setShowAdd(false);
  };

  // ── CRUD: Delete (Array.filter) ───────────────────────────────────────────
  const handleDelete = (id) => setMembers((prev) => prev.filter((m) => m.id !== id));

  // ── CRUD: Edit open ───────────────────────────────────────────────────────
  const handleEditOpen = (member) =>
    setEditMember({ ...member, tags: member.tags.join(", ") });

  // ── CRUD: Edit save (Object.assign via updateMember) ─────────────────────
  const handleEditSave = () => {
    const errors = validateForm(editMember);
    if (Object.keys(errors).length) { setFormErrors(errors); return; }
    const updated = updateMember(editMember, {
      name:      capitalize(cleanInput(editMember.name)),
      age:       Number(editMember.age),
      posts:     Number(editMember.posts),
      followers: Number(editMember.followers),
      following: Number(editMember.following),
      rating:    parseFloat(editMember.rating),
      tags:      parseTags(editMember.tags || ""),
    });
    setMembers((prev) => prev.map((m) => m.id === updated.id ? updated : m));
    setEditMember(null);
    setFormErrors({});
  };

  const formChange = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const editChange = (key, val) => setEditMember((p) => ({ ...p, [key]: val }));

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className={`text-3xl font-black ${text}`} style={{ fontFamily:"'Syne',sans-serif" }}>Community Members</h2>
          <p className={`${muted} text-sm mt-1`}>CRUD · Search & Filters · Array Methods · String Methods</p>
        </div>
        <button onClick={() => { setShowAdd(!showAdd); setFormErrors({}); }}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all flex-shrink-0">
          {showAdd ? "✕ Cancel" : "+ Add Member"}
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <AddForm
          isDark={isDark}
          form={form}
          setForm={setForm}
          formErrors={formErrors}
          onAdd={handleAdd}
          onCancel={() => { setShowAdd(false); setFormErrors({}); }}
        />
      )}


      {/* Search + Filters */}
      <div className={`${filterBar} border rounded-2xl p-5 mb-6`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search name or username..."
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors sm:col-span-2 lg:col-span-1 ${inp}`} />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${sel}`}>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select value={filterCity} onChange={(e) => setFilterCity(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${sel}`}>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={filterVerified} onChange={(e) => setFilterVerified(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${sel}`}>
            {["All","Verified","Unverified"].map((v) => <option key={v}>{v}</option>)}
          </select>
          <select value={filterMinFollowers} onChange={(e) => setFilterMinFollowers(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${sel}`}>
            {[["All","All"],["500+","500"],["1000+","1000"],["3000+","3000"],["5000+","5000"]].map(([l,v])=>(
              <option key={v} value={v}>{l} followers</option>
            ))}
          </select>
          <select value={filterMinRating} onChange={(e) => setFilterMinRating(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${sel}`}>
            {[["All","All"],["4.0+","4"],["4.5+","4.5"],["4.8+","4.8"]].map(([l,v])=>(
              <option key={v} value={v}>Rating {l}</option>
            ))}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className={`border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${sel}`}>
            {SORT_OPTIONS.map(({value,label})=><option key={value} value={value}>{label}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <p className={`${muted} text-xs`}>
            Showing <span className="text-cyan-400 font-bold">{filtered.length}</span> of {members.length} members
            {hasMegaInfluencer(filtered) && <span className="ml-2 text-amber-400">🌟 Mega influencer in results</span>}
            {allHaveEmail(members) && <span className="ml-2 text-green-400 hidden sm:inline">· All emails verified</span>}
          </p>
          <button onClick={()=>{setSearch("");setFilterRole("All");setFilterCity("All");setFilterVerified("All");setFilterMinFollowers("All");setFilterMinRating("All");setSortBy("default");}}
            className={`text-xs transition-colors ${isDark?"text-gray-500 hover:text-cyan-400":"text-slate-400 hover:text-cyan-600"}`}>
            Clear filters
          </button>
        </div>
      </div>

      {/* Cards Grid — Array.map() */}
      {filtered.length === 0 ? (
        <div className={`${filterBar} border rounded-2xl p-16 text-center`}>
          <p className={`${muted} text-lg`}>No members found.</p>
          <p className={`${muted} text-sm mt-2`}>Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((member, idx) => (
            <div key={member.id}
              className={`${card} border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 group flex flex-col`}>
              {/* Avatar */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${member.name}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover bg-gray-700"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${GRADIENTS[idx % GRADIENTS.length]} items-center justify-center text-white font-black text-lg`}
                    style={{ display: "none" }}
                  >
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  {member.verified && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className={`${text} font-bold text-sm truncate`}>{member.name}</h3>
                  {/* String method: maskEmail */}
                  <p className={`${muted} text-xs truncate`}>{member.username}</p>
                </div>
              </div>

              {/* Role badge — String method: formatRole (toUpperCase) */}
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 self-start ${isDark?"bg-cyan-500/10 text-cyan-400":"bg-cyan-50 text-cyan-600"}`}>
                {formatRole(member.role)}
              </span>

              {/* Bio — String method: truncateBio (slice) */}
              <p className={`${muted} text-xs leading-relaxed mb-4 flex-1`}>{truncateBio(member.bio, 65)}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[["Posts",member.posts],["Followers",member.followers>=1000?(member.followers/1000).toFixed(1)+"k":member.followers],["Rating",member.rating+"★"]].map(([l,v])=>(
                  <div key={l} className={`rounded-lg p-2 text-center ${isDark?"bg-gray-800":"bg-slate-100"}`}>
                    <p className={`${text} font-bold text-xs`}>{v}</p>
                    <p className={`${muted} text-xs`}>{l}</p>
                  </div>
                ))}
              </div>

              {/* City + ID — String method: formatId (padStart) */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-2.5 py-1 rounded-full ${isDark?"bg-gray-800 text-gray-400":"bg-slate-100 text-slate-500"}`}>
                  📍 {member.city}
                </span>
                <span className={`text-xs font-mono ${muted}`}>#{formatId(member.id)}</span>
              </div>

              {/* Tags — String method: parseTags used on add */}
              <div className="flex flex-wrap gap-1 mb-4">
                {(member.tags || []).slice(0, 3).map((tag) => (
                  <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${isDark?"bg-gray-800 text-gray-500":"bg-slate-100 text-slate-500"}`}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button onClick={() => setInfoMember(member)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${isDark?"bg-gray-800 border-gray-700 text-gray-400 hover:border-cyan-500/30 hover:text-cyan-400":"bg-slate-100 border-slate-200 text-slate-500 hover:border-cyan-400 hover:text-cyan-600"}`}>
                  👁 Info
                </button>
                <button onClick={() => { handleEditOpen(member); setFormErrors({}); }}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${isDark?"bg-gray-800 border-gray-700 text-gray-400 hover:border-amber-500/30 hover:text-amber-400":"bg-slate-100 border-slate-200 text-slate-500 hover:border-amber-400 hover:text-amber-600"}`}>
                  ✏️ Edit
                </button>
                <button onClick={() => handleDelete(member.id)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${isDark?"bg-gray-800 border-gray-700 text-gray-400 hover:border-red-500/30 hover:text-red-400":"bg-slate-100 border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-500"}`}>
                  🗑 Del
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editMember && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${modal} border rounded-2xl p-7 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto`}>
            <h3 className={`${text} font-black text-xl mb-5`} style={{ fontFamily:"'Syne',sans-serif" }}>Edit Member</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[["name","Name"],["username","Username"],["age","Age"],["role","Role"],["city","City"],["posts","Posts"],["followers","Followers"],["rating","Rating"]].map(([key,label])=>(
                <div key={key}>
                  <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider ${muted}`}>{label}</label>
                  <input
                    value={editMember[key]}
                    onChange={(e) => editChange(key, e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${inp} ${formErrors[key] ? "border-red-500" : ""}`}
                  />
                  {formErrors[key] && <p className="text-red-400 text-xs mt-1">{formErrors[key]}</p>}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider ${muted}`}>Bio</label>
              <textarea value={editMember.bio} onChange={(e) => editChange("bio", e.target.value)} rows={2}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none resize-none transition-colors ${inp}`} />
            </div>
            <div className="mb-4">
              <label className={`block text-xs font-medium mb-1.5 uppercase tracking-wider ${muted}`}>Tags</label>
              <input value={editMember.tags} onChange={(e) => editChange("tags", e.target.value)}
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-colors ${inp}`} />
            </div>
            <div className="flex items-center gap-3 mb-5">
              <input type="checkbox" id="editVerified" checked={editMember.verified}
                onChange={(e) => editChange("verified", e.target.checked)} className="accent-cyan-500 w-4 h-4" />
              <label htmlFor="editVerified" className={`${sub} text-sm`}>Verified user</label>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setEditMember(null); setFormErrors({}); }}
                className={`flex-1 py-3 rounded-xl text-sm transition-colors ${isDark?"bg-gray-800 text-gray-400 hover:bg-gray-700":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                Cancel
              </button>
              <button onClick={handleEditSave}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Info Modal — Object Methods display ── */}
      {infoMember && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${modal} border rounded-2xl p-7 w-full max-w-md shadow-2xl`}>
            <h3 className={`${text} font-black text-xl mb-2`}>{infoMember.name}</h3>
            <p className={`${muted} text-sm mb-5`}>{formatSummary(infoMember)}</p>

            {/* Object.keys() display */}
            <div className="mb-4">
              <p className={`${muted} text-xs uppercase tracking-wider font-bold mb-2`}>Object Keys ({getMemberKeys(infoMember).length})</p>
              <div className="flex flex-wrap gap-1">
                {getMemberKeys(infoMember).map((k) => (
                  <span key={k} className={`text-xs px-2 py-1 rounded-full ${isDark?"bg-gray-800 text-cyan-400":"bg-cyan-50 text-cyan-600"}`}>{k}</span>
                ))}
              </div>
            </div>

            {/* Masked email — String method: maskEmail (replace) */}
            <div className={`rounded-xl p-4 mb-4 ${isDark?"bg-gray-800":"bg-slate-100"}`}>
              <p className={`${muted} text-xs mb-1`}>Email (masked)</p>
              <p className={`${text} text-sm font-mono`}>{maskEmail(infoMember.email)}</p>
            </div>

            {/* removeSensitiveData — delete operator */}
            <div className={`rounded-xl p-4 mb-5 ${isDark?"bg-gray-800":"bg-slate-100"}`}>
              <p className={`${muted} text-xs mb-2`}>Public Profile (email removed via delete operator)</p>
              <p className={`text-green-400 text-xs font-mono`}>
                {JSON.stringify(removeSensitiveData(infoMember), null, 0).slice(0, 120)}...
              </p>
            </div>

            <button onClick={() => setInfoMember(null)}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-semibold">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function Testimonials({ isDark }) {
  const card = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-slate-200";
  const text = isDark ? "text-white" : "text-slate-900";
  const sub  = isDark ? "text-gray-400" : "text-slate-600";

  const reviews = [
    { name:"Sara Ahmed",   role:"Designer",        text:"FaceApp completely changed how I share my creative work. The UI is absolutely stunning!", avatar:"SA" },
    { name:"Ali Hassan",   role:"Developer",       text:"The performance is insane. Pages load instantly and the experience is buttery smooth.",    avatar:"AH" },
    { name:"Zara Khan",    role:"Content Creator", text:"I grew my audience by 300% in just 2 months. The algorithm actually works!",               avatar:"ZK" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className={`text-3xl font-black ${text} mb-2 text-center`} style={{ fontFamily:"'Syne',sans-serif" }}>Loved by Users</h2>
      <p className={`${sub} text-center mb-10`}>See what our community is saying</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map(({ name, role, text: t, avatar }) => (
          <div key={name} className={`${card} border rounded-2xl p-6`}>
            <div className="flex gap-1 mb-4">{[...Array(5)].map((_,i)=><span key={i} className="text-amber-400 text-sm">★</span>)}</div>
            <p className={`${sub} text-sm leading-relaxed mb-5`}>"{t}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">{avatar}</div>
              <div>
                <p className={`${text} font-semibold text-sm`}>{name}</p>
                <p className={`${sub} text-xs`}>{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA({ isDark }) {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);
  const text = isDark ? "text-white" : "text-slate-900";
  const sub  = isDark ? "text-gray-400" : "text-slate-500";
  const inp  = isDark ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500" : "bg-white border-slate-300 text-slate-900 placeholder-slate-400";

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-10 text-center">
        <h2 className={`text-3xl font-black ${text} mb-3`} style={{ fontFamily:"'Syne',sans-serif" }}>Stay in the Loop</h2>
        <p className={`${sub} mb-8 max-w-md mx-auto text-sm`}>Get the latest updates and new features delivered to your inbox.</p>
        {sent ? (
          <p className="text-cyan-400 font-semibold">🎉 You're subscribed!</p>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className={`flex-1 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors ${inp}`} />
            <button onClick={() => email && setSent(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Home() {
  const { isDark } = useTheme();
  const apiUsers   = useRandomUsers();

  const [members, setMembers] = useState(membersDB);

  // Merge API users when they load
  useEffect(() => {
    if (apiUsers.length > 0) {
      setMembers((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const newOnes     = apiUsers.filter((u) => !existingIds.has(u.id));
        return [...prev, ...newOnes];
      });
    }
  }, [apiUsers]);

  // Live stats using array methods
  const stats = {
    total:          members.length,
    totalFollowers: getTotalFollowers(members),
    avgRating:      getAverageRating(members),
  };

  return (
    <MainLayout>
      <Hero      isDark={isDark} stats={stats} />
      <Features  isDark={isDark} />
      <CommunitySection isDark={isDark} members={members} setMembers={setMembers} />
      <Testimonials isDark={isDark} />
      <CTA       isDark={isDark} />
    </MainLayout>
  );
}
