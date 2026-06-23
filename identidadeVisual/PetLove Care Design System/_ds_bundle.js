/* @ds-bundle: {"format":3,"namespace":"PetLoveCareDesignSystem_7829c3","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"SectionHeader","sourcePath":"components/brand/SectionHeader.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"Textarea","sourcePath":"components/core/Textarea.jsx"},{"name":"FeedbackCard","sourcePath":"components/feedback/FeedbackCard.jsx"},{"name":"RatingStars","sourcePath":"components/feedback/RatingStars.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"ServiceCard","sourcePath":"components/layout/ServiceCard.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"5d38d2bef02c","components/brand/SectionHeader.jsx":"b642e92fbfd7","components/core/Badge.jsx":"f976f1e76026","components/core/Button.jsx":"e3f0c14239b7","components/core/Input.jsx":"91d708355e3a","components/core/Select.jsx":"b91eb3e4e74e","components/core/Textarea.jsx":"6ad3718f47fa","components/feedback/FeedbackCard.jsx":"4117a416aad3","components/feedback/RatingStars.jsx":"7fb331e493e2","components/layout/Card.jsx":"76eb62c81ca0","components/layout/ServiceCard.jsx":"7b26e4c582f6","components/navigation/NavBar.jsx":"3c7e1029c8b4","components/navigation/Sidebar.jsx":"4ad29d421d93","ui_kits/admin/screens.jsx":"c0b611642a7e","ui_kits/web/modals.jsx":"51eb557a110a","ui_kits/web/sections.jsx":"9ccaea25942d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PetLoveCareDesignSystem_7829c3 = window.PetLoveCareDesignSystem_7829c3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
/**
 * PetLove Care — Logo
 * Renders the paw-heart + cat brand mark. Three lockups × two color themes.
 *  - variant: "lockup" (mark + PETLOVE CARE), "mark" (icon only), "wordmark" (text only)
 *  - theme: "color" (teal paw / coral+teal text — for light bg)
 *           "white" (all white — for navy / dark bg)
 * Assets live in the design-system /assets folder. `basePath` defaults to
 * "../../assets/" which resolves from any component card or ui_kit/<x>/ page;
 * override it if you mount the logo somewhere else.
 */
const FILES = {
  'lockup-color': 'logo-lockup.png',
  'mark-color': 'logo-mark.png',
  'wordmark-color': 'logo-wordmark-text.png',
  'lockup-white': 'logo-lockup-white.png',
  'mark-white': 'logo-mark-white.png',
  'wordmark-white': 'logo-wordmark-white.png'
};
function Logo({
  variant = 'lockup',
  theme = 'color',
  height,
  basePath = '../../assets/',
  style,
  alt = 'PetLove Care'
}) {
  const file = FILES[`${variant}-${theme}`] || FILES['lockup-color'];
  const defaultH = variant === 'wordmark' ? 44 : variant === 'mark' ? 56 : 72;
  return /*#__PURE__*/React.createElement("img", {
    src: basePath + file,
    alt: alt,
    style: {
      height: (height || defaultH) + (typeof (height || defaultH) === 'number' ? 'px' : ''),
      width: 'auto',
      display: 'block',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionHeader.jsx
try { (() => {
/**
 * PetLove Care — SectionHeader
 * The navy band that opens every marketing section: a bright-teal rule,
 * a big white display title on the left, and a muted subtitle on the right.
 */
function SectionHeader({
  title,
  subtitle,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy)',
      padding: '40px clamp(24px, 6vw, 96px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '40px',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: '5px',
      borderRadius: '3px',
      background: 'var(--teal-bright)',
      alignSelf: 'stretch'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'clamp(28px, 4vw, 44px)',
      letterSpacing: 'var(--ls-display)',
      color: 'var(--white)',
      lineHeight: 1.05
    }
  }, title)), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '460px',
      textAlign: 'right',
      fontFamily: 'var(--font-body)',
      fontSize: '17px',
      lineHeight: 1.4,
      color: 'var(--muted-on-dark)'
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
/**
 * PetLove Care — Badge / StatusBadge
 * `status` maps to the appointment lifecycle pill colors from the admin app.
 * Without `status`, renders a neutral coral/teal/navy tag.
 */
const STATUS = {
  agendado: {
    bg: 'var(--status-agendado-bg)',
    fg: 'var(--status-agendado-fg)',
    label: 'Agendado'
  },
  em_andamento: {
    bg: 'var(--status-andamento-bg)',
    fg: 'var(--status-andamento-fg)',
    label: 'Em andamento'
  },
  finalizado: {
    bg: 'var(--status-finalizado-bg)',
    fg: 'var(--status-finalizado-fg)',
    label: 'Finalizado'
  },
  cancelado: {
    bg: 'var(--status-cancelado-bg)',
    fg: 'var(--status-cancelado-fg)',
    label: 'Cancelado'
  }
};
const TONE = {
  coral: {
    bg: 'rgba(255,127,80,0.15)',
    fg: 'var(--coral-dark)'
  },
  teal: {
    bg: 'rgba(44,110,143,0.14)',
    fg: 'var(--teal)'
  },
  navy: {
    bg: 'var(--navy)',
    fg: '#fff'
  },
  neutral: {
    bg: 'var(--surface)',
    fg: 'var(--muted)'
  }
};
function Badge({
  children,
  status,
  tone = 'neutral',
  style
}) {
  const s = status ? STATUS[status] : TONE[tone] || TONE.neutral;
  const text = children != null ? children : status ? STATUS[status]?.label : '';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 11px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-body)',
      fontSize: '12px',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.01em',
      background: s.bg,
      color: s.fg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, text);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PetLove Care — Button
 * Primary action uses coral; secondary uses teal; danger for destructive;
 * link for the soft text links used under forms.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  fullWidth = false,
  onClick,
  style,
  ...rest
}) {
  const palette = {
    primary: {
      bg: 'var(--coral)',
      bgHover: 'var(--coral-dark)',
      fg: '#fff',
      border: 'transparent'
    },
    secondary: {
      bg: 'var(--teal)',
      bgHover: '#255f7c',
      fg: '#fff',
      border: 'transparent'
    },
    danger: {
      bg: 'var(--danger)',
      bgHover: '#b73636',
      fg: '#fff',
      border: 'transparent'
    },
    outline: {
      bg: 'transparent',
      bgHover: 'rgba(255,127,80,0.10)',
      fg: 'var(--coral)',
      border: 'var(--coral)'
    }
  };
  const sizes = {
    sm: {
      padding: '6px 13px',
      fontSize: '13px'
    },
    md: {
      padding: '12px 22px',
      fontSize: '15px'
    },
    lg: {
      padding: '15px 30px',
      fontSize: '17px'
    }
  };
  const p = palette[variant] || palette.primary;
  const s = sizes[size] || sizes.md;
  if (variant === 'link') {
    return /*#__PURE__*/React.createElement("button", _extends({
      type: type,
      disabled: disabled,
      onClick: onClick,
      style: {
        background: 'none',
        border: 'none',
        color: 'var(--teal)',
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 'var(--fw-semibold)',
        cursor: disabled ? 'default' : 'pointer',
        padding: '4px 2px',
        textDecoration: 'none',
        filter: 'brightness(1.1)',
        ...style
      },
      onMouseDown: e => e.currentTarget.style.transform = 'translateY(1px)',
      onMouseUp: e => e.currentTarget.style.transform = 'translateY(0)'
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      width: fullWidth ? '100%' : 'auto',
      background: p.bg,
      color: p.fg,
      border: `2px solid ${p.border}`,
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: '0.01em',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'background 0.15s ease, transform 0.05s ease, filter 0.15s ease',
      ...s,
      ...style
    },
    onMouseEnter: e => {
      if (!disabled && p.bgHover) e.currentTarget.style.background = p.bgHover;
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.background = p.bg;
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px)';
    },
    onMouseUp: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(0)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PetLove Care — Input
 * Two themes: "light" (admin forms on light surfaces — bordered) and
 * "filled" (brand modals over navy — solid #d9d9d9 fill, the Figma style).
 */
function Input({
  label,
  theme = 'light',
  type = 'text',
  value,
  placeholder,
  onChange,
  id,
  error,
  style,
  ...rest
}) {
  const filled = theme === 'filled';
  const [focused, setFocused] = React.useState(false);
  const field = /*#__PURE__*/React.createElement("input", _extends({
    id: id,
    type: type,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      background: filled ? 'var(--input)' : '#fff',
      border: `2px solid ${error ? 'var(--danger)' : focused ? 'var(--coral)' : filled ? 'transparent' : '#cbd5e1'}`,
      borderRadius: 'var(--radius-sm)',
      padding: '11px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--navy)',
      outline: 'none',
      boxShadow: focused ? '0 0 0 4px rgba(255,127,80,0.18)' : 'none',
      transition: 'border-color 0.15s, box-shadow 0.15s',
      ...style
    }
  }, rest));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 'var(--fw-bold)',
      color: filled ? 'var(--muted-on-dark)' : 'var(--muted)'
    }
  }, label), field, error && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger)',
      fontSize: '12px',
      fontWeight: 600
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PetLove Care — Select
 * Brand dropdown used in the "Agende agora" modal (filled #d9d9d9) and
 * admin forms (light bordered). Chevron drawn with CSS.
 */
function Select({
  label,
  theme = 'filled',
  value,
  onChange,
  options = [],
  placeholder,
  id,
  style,
  ...rest
}) {
  const filled = theme === 'filled';
  const [focused, setFocused] = React.useState(false);
  const field = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: id,
    value: value,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      appearance: 'none',
      WebkitAppearance: 'none',
      background: filled ? 'var(--input)' : '#fff',
      border: `2px solid ${focused ? 'var(--coral)' : filled ? 'transparent' : '#cbd5e1'}`,
      borderRadius: 'var(--radius-sm)',
      padding: '11px 40px 11px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: value ? 'var(--navy)' : '#7c8696',
      outline: 'none',
      cursor: 'pointer',
      boxShadow: focused ? '0 0 0 4px rgba(255,127,80,0.18)' : 'none',
      transition: 'border-color 0.15s, box-shadow 0.15s',
      ...style
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder), options.map(o => {
    const val = typeof o === 'string' ? o : o.value;
    const lbl = typeof o === 'string' ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: val,
      value: val
    }, lbl);
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      width: '9px',
      height: '9px',
      borderRight: '2px solid var(--navy)',
      borderBottom: '2px solid var(--navy)',
      transform: 'translateY(-65%) rotate(45deg)',
      pointerEvents: 'none',
      opacity: 0.7
    }
  }));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 'var(--fw-bold)',
      color: filled ? 'var(--muted-on-dark)' : 'var(--muted)'
    }
  }, label), field);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/core/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PetLove Care — Textarea (e.g. "Observações" field, feedback replies).
 */
function Textarea({
  label,
  theme = 'light',
  value,
  placeholder,
  onChange,
  rows = 4,
  id,
  style,
  ...rest
}) {
  const filled = theme === 'filled';
  const [focused, setFocused] = React.useState(false);
  const field = /*#__PURE__*/React.createElement("textarea", _extends({
    id: id,
    value: value,
    placeholder: placeholder,
    onChange: onChange,
    rows: rows,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      width: '100%',
      boxSizing: 'border-box',
      resize: 'vertical',
      background: filled ? 'var(--input)' : '#fff',
      border: `2px solid ${focused ? 'var(--teal)' : filled ? 'transparent' : '#cbd5e1'}`,
      borderRadius: 'var(--radius)',
      padding: '12px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--navy)',
      outline: 'none',
      transition: 'border-color 0.15s',
      ...style
    }
  }, rest));
  if (!label) return field;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '13px',
      fontWeight: 'var(--fw-bold)',
      color: filled ? 'var(--muted-on-dark)' : 'var(--muted)'
    }
  }, label), field);
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/feedback/RatingStars.jsx
try { (() => {
/** PetLove Care — RatingStars (feedback 1–5, gold). */
function RatingStars({
  value = 0,
  max = 5,
  size = 18,
  style
}) {
  const v = Math.max(0, Math.min(max, Math.round(value)));
  return /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--star)',
      letterSpacing: '0.08em',
      fontSize: size + 'px',
      lineHeight: 1,
      ...style
    }
  }, '★'.repeat(v), '☆'.repeat(max - v));
}
Object.assign(__ds_scope, { RatingStars });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/RatingStars.jsx", error: String((e && e.message) || e) }); }

// components/feedback/FeedbackCard.jsx
try { (() => {
/**
 * PetLove Care — FeedbackCard
 * The admin feedback tile: client name + rating header, the comment, then
 * either the admin's reply (teal-bordered note) or a reply box.
 */
function FeedbackCard({
  name = 'Cliente',
  rating = 5,
  comment,
  response,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: '18px',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--navy)',
      fontSize: '16px'
    }
  }, name), /*#__PURE__*/React.createElement(__ds_scope.RatingStars, {
    value: rating,
    size: 16
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontSize: '15px',
      color: 'var(--text)',
      lineHeight: 1.5
    }
  }, comment), response && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      background: 'var(--surface)',
      padding: '10px 12px',
      borderRadius: 'var(--radius-sm)',
      fontSize: '14px',
      color: 'var(--text)',
      borderLeft: '3px solid var(--teal)',
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--teal)'
    }
  }, "Resposta: "), response));
}
Object.assign(__ds_scope, { FeedbackCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/FeedbackCard.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
/** PetLove Care — generic white surface card (shadow + rounded). */
function Card({
  children,
  padding = 'var(--space-5)',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      boxShadow: 'var(--shadow)',
      padding,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/ServiceCard.jsx
try { (() => {
/**
 * PetLove Care — ServiceCard
 * The coral service panel from the marketing site (TOSA / BANHO): a coral
 * fill, navy uppercase display title, navy body copy, centered.
 */
function ServiceCard({
  title,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--coral)',
      borderRadius: 'var(--radius)',
      padding: '40px 34px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      textAlign: 'center',
      ...style
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extra)',
      fontSize: '34px',
      letterSpacing: '0.02em',
      color: 'var(--navy)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '16px',
      lineHeight: 1.55,
      color: 'var(--navy)',
      textWrap: 'pretty'
    }
  }, children));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
/**
 * PetLove Care — NavBar (marketing site top navigation)
 * Light bar: brand mark, centered links, coral "Agende" CTA.
 */
function NavBar({
  links = ['Início', 'Serviços', 'Sobre nós', 'Contato'],
  active = 'Início',
  onNavigate,
  onAgendar,
  logoBasePath,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      padding: '16px clamp(20px, 5vw, 64px)',
      background: 'var(--bg-light)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "wordmark",
    theme: "color",
    height: 34,
    basePath: logoBasePath
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(16px, 3vw, 40px)'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate(l);
    },
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: l === active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
      fontSize: '20px',
      color: 'var(--navy)',
      textDecoration: 'none',
      borderBottom: l === active ? '3px solid var(--coral)' : '3px solid transparent',
      paddingBottom: '2px',
      transition: 'border-color 0.15s, color 0.15s'
    }
  }, l))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "md",
    onClick: onAgendar
  }, "Agende"));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
/**
 * PetLove Care — Sidebar (admin desktop shell navigation)
 * Navy gradient rail: white logo, emoji-led nav items (active = coral),
 * and the logged-in admin block at the bottom.
 */
function Sidebar({
  items = [{
    id: 'agendamentos',
    icon: '📅',
    label: 'Agendamentos'
  }, {
    id: 'servicos',
    icon: '✂️',
    label: 'Serviços'
  }, {
    id: 'feedbacks',
    icon: '💬',
    label: 'Feedbacks'
  }],
  active,
  onSelect,
  adminName = 'Admin',
  adminRole = 'Administrador',
  onLogout,
  logoBasePath,
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 'var(--sidebar-w)',
      flexShrink: 0,
      background: 'linear-gradient(180deg, var(--navy) 0%, var(--navy-deep) 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '22px 16px',
      gap: '22px',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 8px 2px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    variant: "lockup",
    theme: "white",
    height: 88,
    basePath: logoBasePath,
    style: {
      margin: '0 auto'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      flex: 1
    }
  }, items.map(it => {
    const on = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onSelect && onSelect(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '11px 14px',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--fw-bold)',
        fontSize: '15px',
        color: on ? '#fff' : 'var(--muted-on-dark)',
        background: on ? 'var(--coral)' : 'transparent',
        boxShadow: on ? 'var(--shadow-coral)' : 'none',
        transition: 'background 0.15s, color 0.15s'
      },
      onMouseEnter: e => {
        if (!on) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.color = '#fff';
        }
      },
      onMouseLeave: e => {
        if (!on) {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = 'var(--muted-on-dark)';
        }
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '17px'
      }
    }, it.icon), it.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      borderRadius: 'var(--radius)',
      background: 'rgba(255,255,255,0.05)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'var(--teal)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)'
    }
  }, adminName.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.2,
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff',
      fontSize: '14px',
      fontFamily: 'var(--font-body)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, adminName), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'rgba(255,255,255,0.5)',
      fontSize: '12px'
    }
  }, adminRole)), /*#__PURE__*/React.createElement("button", {
    onClick: onLogout,
    title: "Sair",
    style: {
      background: 'none',
      border: 'none',
      color: 'rgba(255,255,255,0.6)',
      fontSize: '17px',
      cursor: 'pointer',
      padding: '2px 4px'
    }
  }, "\u23FB")));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/screens.jsx
try { (() => {
/* PetLove Care — Admin desktop screens (Splash, Login, Agendamentos,
   Serviços, Feedbacks). Recreates the Electron admin app over the DS. */
const A = window.PetLoveCareDesignSystem_7829c3;
const {
  Logo,
  Sidebar,
  Button,
  Input,
  Badge,
  FeedbackCard,
  RatingStars
} = A;
const ASSET = '../../assets/';

/* ── Splash ── */
function Splash() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '32px',
      background: 'radial-gradient(1200px 600px at 50% 30%, #24344d 0%, transparent 70%), linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSET + 'logo-lockup-white.png',
    alt: "PetLove Care",
    style: {
      width: '38%',
      maxWidth: '300px',
      animation: 'splashIn 1s ease both'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '34px',
      height: '34px',
      borderRadius: '50%',
      border: '3px solid rgba(255,255,255,0.18)',
      borderTopColor: 'var(--coral)',
      animation: 'spin 0.8s linear infinite'
    }
  }));
}

/* ── Login ── */
function AdminLogin({
  onEnter
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, var(--navy) 0%, var(--navy-deep) 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      width: '620px',
      height: '620px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(255,127,80,0.22), transparent 60%)',
      top: '-160px',
      right: '-120px',
      filter: 'blur(8px)'
    }
  }), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onEnter();
    },
    style: {
      position: 'relative',
      zIndex: 1,
      width: '340px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '38px 32px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--radius-lg)',
      backdropFilter: 'blur(6px)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: '34px'
    }
  }, "\uD83D\uDC3E"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 4px',
      textAlign: 'center',
      color: 'var(--white)',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      letterSpacing: '0.12em',
      fontSize: '27px'
    }
  }, "LOGIN"), /*#__PURE__*/React.createElement(Input, {
    label: "CPF",
    theme: "filled",
    placeholder: "000.000.000-00",
    defaultValue: "123.456.789-00"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Senha",
    theme: "filled",
    type: "password",
    placeholder: "Sua senha",
    defaultValue: "admin"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    type: "submit",
    fullWidth: true
  }, "Entrar"), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    style: {
      alignSelf: 'center'
    }
  }, "Esqueceu a senha?")));
}

/* ── Page header inside the content area ── */
function PageHead({
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '16px',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: '26px',
      fontFamily: 'var(--font-display)',
      color: 'var(--navy)'
    }
  }, title), children);
}
const TH = {
  textAlign: 'left',
  padding: '12px 16px',
  color: 'var(--muted)',
  fontWeight: 700,
  background: 'var(--surface)',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  fontSize: '12px',
  borderBottom: '1px solid var(--line)'
};
const TD = {
  padding: '13px 16px',
  borderBottom: '1px solid var(--line)',
  fontSize: '14px',
  color: 'var(--text)'
};

/* ── Agendamentos ── */
const AG = [{
  id: 1,
  dh: '20/06/2026 09:00',
  cli: 'Ana Souza',
  pet: 'Mia',
  serv: 'Banho',
  st: 'agendado'
}, {
  id: 2,
  dh: '20/06/2026 11:00',
  cli: 'Carlos M.',
  pet: 'Thor',
  serv: 'Banho + Tosa',
  st: 'em_andamento'
}, {
  id: 3,
  dh: '19/06/2026 16:00',
  cli: 'Júlia R.',
  pet: 'Rex',
  serv: 'Tosa',
  st: 'finalizado'
}, {
  id: 4,
  dh: '18/06/2026 14:00',
  cli: 'Pedro L.',
  pet: 'Bob',
  serv: 'Banho',
  st: 'cancelado'
}];
function Agendamentos() {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "Agendamentos"
  }), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      marginTop: '18px',
      background: '#fff',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Data/Hora', 'Cliente', 'Pet', 'Serviços', 'Status', 'Ações'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: TH
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, AG.map(a => /*#__PURE__*/React.createElement("tr", {
    key: a.id
  }, /*#__PURE__*/React.createElement("td", {
    style: TD
  }, a.dh), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, a.cli), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, a.pet), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, a.serv), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Badge, {
    status: a.st
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      display: 'flex',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Aprovar"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Finalizar"), /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm"
  }, "Recusar")))))));
}

/* ── Serviços ── */
const SV = [{
  id: 1,
  nome: 'Banho',
  desc: 'Banho completo com produtos adequados',
  preco: 'R$ 60,00',
  dur: '45 min'
}, {
  id: 2,
  nome: 'Tosa',
  desc: 'Tosa higiênica ou completa',
  preco: 'R$ 80,00',
  dur: '60 min'
}, {
  id: 3,
  nome: 'Banho + Tosa',
  desc: 'Pacote completo de higiene',
  preco: 'R$ 120,00',
  dur: '90 min'
}];
function Servicos() {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "Servi\xE7os"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      margin: '18px 0 6px'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Nome",
    style: {
      width: '160px'
    }
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Descri\xE7\xE3o",
    style: {
      width: '240px'
    }
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Pre\xE7o",
    type: "number",
    style: {
      width: '110px'
    }
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "Dura\xE7\xE3o (min)",
    type: "number",
    style: {
      width: '130px'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Cadastrar")), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      marginTop: '12px',
      background: '#fff',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Nome', 'Descrição', 'Preço', 'Duração', 'Ações'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: TH
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, SV.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...TD,
      fontWeight: 700,
      color: 'var(--navy)'
    }
  }, s.nome), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, s.desc), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, s.preco), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, s.dur), /*#__PURE__*/React.createElement("td", {
    style: TD
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    size: "sm"
  }, "Excluir")))))));
}

/* ── Feedbacks ── */
const FB = [{
  id: 1,
  name: 'Ana Souza',
  rating: 5,
  comment: 'Atendimento maravilhoso, a Mia saiu cheirosa e tranquila!',
  response: 'Obrigado, Ana! Volte sempre 🐾'
}, {
  id: 2,
  name: 'Carlos M.',
  rating: 4,
  comment: 'Muito bom o banho, só demorou um pouco para começar.'
}, {
  id: 3,
  name: 'Júlia R.',
  rating: 5,
  comment: 'Equipe super cuidadosa com o Rex. Recomendo demais.'
}];
function Feedbacks() {
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(PageHead, {
    title: "Feedbacks"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: '16px',
      gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
      marginTop: '18px'
    }
  }, FB.map(f => f.response ? /*#__PURE__*/React.createElement(FeedbackCard, {
    key: f.id,
    name: f.name,
    rating: f.rating,
    comment: f.comment,
    response: f.response
  }) : /*#__PURE__*/React.createElement("article", {
    key: f.id,
    style: {
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
      padding: '18px',
      background: '#fff',
      boxShadow: 'var(--shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      color: 'var(--navy)'
    }
  }, f.name), /*#__PURE__*/React.createElement(RatingStars, {
    value: f.rating,
    size: 16
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '15px',
      lineHeight: 1.5
    }
  }, f.comment), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Escreva uma resposta\u2026",
    rows: 2,
    style: {
      width: '100%',
      boxSizing: 'border-box',
      border: '1px solid #cbd5e1',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 10px',
      fontFamily: 'var(--font-body)',
      resize: 'vertical'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    style: {
      alignSelf: 'flex-start'
    }
  }, "Responder")))));
}
Object.assign(window, {
  Splash,
  AdminLogin,
  Sidebar,
  Agendamentos,
  Servicos,
  Feedbacks
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/modals.jsx
try { (() => {
/* PetLove Care — Web client modals (Login, Cadastro, Agendar, Cadastrar Pet).
   Navy modal over a dimmed overlay, matching the Figma popups. */
const DSM = window.PetLoveCareDesignSystem_7829c3;
const {
  Input: I,
  Select: S,
  Textarea: T,
  Button: B
} = DSM;
function Overlay({
  children,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(10,16,28,0.55)',
      backdropFilter: 'blur(2px)',
      display: 'grid',
      placeItems: 'center',
      zIndex: 50,
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: '360px',
      maxWidth: '100%',
      background: 'var(--navy)',
      borderRadius: 'var(--radius-lg)',
      padding: '30px 28px',
      boxShadow: 'var(--shadow-lg)',
      maxHeight: '90vh',
      overflowY: 'auto'
    }
  }, children));
}
function Title({
  children
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 20px',
      textAlign: 'center',
      color: 'var(--white)',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '28px',
      letterSpacing: '0.08em'
    }
  }, children);
}
function LoginModal({
  onClose,
  go
}) {
  return /*#__PURE__*/React.createElement(Overlay, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Title, null, "LOGIN"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement(I, {
    label: "CPF",
    theme: "filled",
    placeholder: "000.000.000-00"
  }), /*#__PURE__*/React.createElement(I, {
    label: "Senha",
    theme: "filled",
    type: "password",
    placeholder: "Sua senha"
  }), /*#__PURE__*/React.createElement(B, {
    variant: "primary",
    fullWidth: true,
    onClick: () => go('done'),
    style: {
      marginTop: '4px'
    }
  }, "Entrar"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px',
      marginTop: '4px'
    }
  }, /*#__PURE__*/React.createElement(B, {
    variant: "link",
    onClick: () => go('signup')
  }, "N\xE3o tem uma conta? Cadastre-se"), /*#__PURE__*/React.createElement(B, {
    variant: "link"
  }, "Esqueceu a senha?"))));
}
function SignupModal({
  onClose,
  go
}) {
  return /*#__PURE__*/React.createElement(Overlay, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Title, null, "CADASTRE-SE"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement(I, {
    label: "Nome",
    theme: "filled",
    placeholder: "Seu nome"
  }), /*#__PURE__*/React.createElement(I, {
    label: "CPF",
    theme: "filled",
    placeholder: "000.000.000-00"
  }), /*#__PURE__*/React.createElement(I, {
    label: "Email",
    theme: "filled",
    type: "email",
    placeholder: "voce@email.com"
  }), /*#__PURE__*/React.createElement(I, {
    label: "Telefone",
    theme: "filled",
    placeholder: "(11) 99999-0000"
  }), /*#__PURE__*/React.createElement(I, {
    label: "Senha",
    theme: "filled",
    type: "password",
    placeholder: "Crie uma senha"
  }), /*#__PURE__*/React.createElement(B, {
    variant: "primary",
    fullWidth: true,
    onClick: () => go('schedule'),
    style: {
      marginTop: '4px'
    }
  }, "Confirmar"), /*#__PURE__*/React.createElement(B, {
    variant: "link",
    onClick: () => go('login')
  }, "J\xE1 tem conta? Entrar")));
}
function ScheduleModal({
  onClose,
  go
}) {
  return /*#__PURE__*/React.createElement(Overlay, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Title, null, "AGENDE AGORA"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement(S, {
    theme: "filled",
    placeholder: "Escolha o pet",
    options: ['Rex', 'Mia', 'Thor']
  }), /*#__PURE__*/React.createElement(S, {
    theme: "filled",
    placeholder: "Escolha o servi\xE7o",
    options: ['Banho', 'Tosa', 'Banho + Tosa']
  }), /*#__PURE__*/React.createElement(S, {
    theme: "filled",
    placeholder: "Escolha a data",
    options: ['20/06', '21/06', '22/06']
  }), /*#__PURE__*/React.createElement(S, {
    theme: "filled",
    placeholder: "Escolha um hor\xE1rio",
    options: ['09:00', '11:00', '14:00', '16:00']
  }), /*#__PURE__*/React.createElement(B, {
    variant: "primary",
    fullWidth: true,
    onClick: () => go('done'),
    style: {
      marginTop: '4px'
    }
  }, "Agendar"), /*#__PURE__*/React.createElement(B, {
    variant: "link",
    onClick: () => go('pet')
  }, "N\xE3o tem um pet cadastrado? Cadastre-o")));
}
function PetModal({
  onClose,
  go
}) {
  return /*#__PURE__*/React.createElement(Overlay, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement(Title, null, "CADASTRE SEU PET"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement(I, {
    label: "Nome do pet",
    theme: "filled",
    placeholder: "Ex.: Rex"
  }), /*#__PURE__*/React.createElement(S, {
    label: "Esp\xE9cie",
    theme: "filled",
    placeholder: "Esp\xE9cie",
    options: ['Cachorro', 'Gato', 'Outro']
  }), /*#__PURE__*/React.createElement(I, {
    label: "Ra\xE7a",
    theme: "filled",
    placeholder: "Ex.: Golden Retriever"
  }), /*#__PURE__*/React.createElement(I, {
    label: "Idade",
    theme: "filled",
    type: "number",
    placeholder: "Anos"
  }), /*#__PURE__*/React.createElement(T, {
    label: "Observa\xE7\xF5es",
    theme: "filled",
    rows: 3,
    placeholder: "Ex.: c\xE3o acima de 20kg"
  }), /*#__PURE__*/React.createElement(B, {
    variant: "primary",
    fullWidth: true,
    onClick: () => go('schedule'),
    style: {
      marginTop: '4px'
    }
  }, "Cadastrar Pet")));
}
function DoneModal({
  onClose
}) {
  return /*#__PURE__*/React.createElement(Overlay, {
    onClose: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '52px'
    }
  }, "\uD83D\uDC3E"), /*#__PURE__*/React.createElement(Title, null, "TUDO CERTO!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '-12px 0 0',
      color: 'var(--muted-on-dark)',
      fontFamily: 'var(--font-body)'
    }
  }, "Seu agendamento foi enviado. Voc\xEA receber\xE1 a confirma\xE7\xE3o em breve."), /*#__PURE__*/React.createElement(B, {
    variant: "primary",
    fullWidth: true,
    onClick: onClose
  }, "Voltar ao in\xEDcio")));
}
Object.assign(window, {
  LoginModal,
  SignupModal,
  ScheduleModal,
  PetModal,
  DoneModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/modals.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/sections.jsx
try { (() => {
/* PetLove Care — Web marketing sections.
   Composes DS primitives from window.PetLoveCareDesignSystem_7829c3.
   Exports section components onto window for index.html. */
const DS = window.PetLoveCareDesignSystem_7829c3;
const {
  NavBar,
  SectionHeader,
  ServiceCard,
  Button,
  Logo
} = DS;
const ASSETS = '../../assets/';
function Hero({
  onAgendar,
  onNav
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--bg-light)',
      padding: '0 0 56px'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    active: "In\xEDcio",
    onAgendar: onAgendar,
    onNavigate: onNav
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 48px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 2px',
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: 'clamp(22px, 2.6vw, 34px)',
      color: 'var(--navy)',
      lineHeight: 1.1
    }
  }, "Cuidado em cada momento para seu"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 0 26px',
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(56px, 8vw, 116px)',
      lineHeight: 0.92,
      letterSpacing: '-0.02em',
      color: 'var(--navy)'
    }
  }, "MELHOR", /*#__PURE__*/React.createElement("br", null), "AMIGO"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onAgendar
  }, "AGENDE AGORA"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '26px 0 0',
      maxWidth: '420px',
      fontFamily: 'var(--font-body)',
      fontSize: '16px',
      lineHeight: 1.55,
      color: 'var(--navy)'
    }
  }, "Unimos organiza\xE7\xE3o e atendimento humanizado para oferecer experi\xEAncias seguras e acolhedoras para seu pet.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ASSETS + 'hero-cat.jpg',
    alt: "Gato",
    style: {
      width: '100%',
      maxWidth: '480px',
      aspectRatio: '1/1',
      objectFit: 'cover',
      borderRadius: '6px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '18px',
      color: 'var(--navy)',
      fontSize: '24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    title: "WhatsApp"
  }, "\u2706"), /*#__PURE__*/React.createElement("span", {
    title: "Instagram"
  }, "\u25CE"), /*#__PURE__*/React.createElement("span", {
    title: "Facebook"
  }, "f")))));
}
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    id: "servicos"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Nossos principais servi\xE7os",
    subtitle: "Uma experi\xEAncia moderna e acolhedora para facilitar o cuidado com o bem-estar do seu pet."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '28px',
      maxWidth: '900px',
      margin: '0 auto',
      padding: '44px 48px'
    }
  }, /*#__PURE__*/React.createElement(ServiceCard, {
    title: "TOSA"
  }, "Nossa tosa \xE9 realizada com aten\xE7\xE3o aos detalhes e foco total no conforto e bem-estar do seu pet. Utilizamos equipamentos apropriados, t\xE9cnicas cuidadosas e um atendimento humanizado."), /*#__PURE__*/React.createElement(ServiceCard, {
    title: "BANHO"
  }, "O banho \xE9 realizado com produtos adequados e t\xE9cnicas de higiene desenvolvidas para garantir limpeza, conforto e seguran\xE7a ao seu pet. Nossa equipe prioriza um atendimento cuidadoso e acolhedor.")));
}
function About() {
  const stats = [{
    n: '+500',
    l: 'GATOS FELIZES'
  }, {
    n: '+800',
    l: 'SUPER CACHORROS'
  }, {
    n: '100%',
    l: 'CERTIFICADOS'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "sobre"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Sobre n\xF3s",
    subtitle: "Unimos atendimento humanizado, cuidado profissional e praticidade para o bem-estar do seu pet."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: '760px',
      margin: '0 auto',
      padding: '48px 48px 40px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(20px, 2.4vw, 30px)',
      lineHeight: 1.35,
      color: 'var(--navy)',
      textWrap: 'pretty'
    }
  }, "A PetLoveCare nasceu com o prop\xF3sito de unir tecnologia e cuidado em um s\xF3 lugar. Criamos uma solu\xE7\xE3o que ajuda a organizar atendimentos, agilizar processos e manter o foco no que realmente importa: o bem-estar dos pets."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--coral)',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '20px',
      padding: '34px 48px'
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l,
    style: {
      textAlign: 'center',
      color: 'var(--navy)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: '46px',
      lineHeight: 1
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '17px',
      letterSpacing: '0.04em',
      marginTop: '6px'
    }
  }, s.l)))));
}
function ContactFooter({
  onAgendar
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "contato"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    title: "Contato",
    subtitle: "Fale com nossa equipe e tire d\xFAvidas sobre nossos servi\xE7os, atendimentos e cuidados especializados."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--navy)',
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "lockup",
    theme: "white",
    height: 120
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      color: 'var(--muted-on-dark)',
      fontFamily: 'var(--font-body)',
      fontSize: '15px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCD Av. dos Pets, 1234 \u2014 S\xE3o Paulo"), /*#__PURE__*/React.createElement("span", null, "\u2709 contato@petlovecare.com.br"), /*#__PURE__*/React.createElement("span", null, "\u2706 (11) 99999-0000")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onAgendar
  }, "AGENDE AGORA"), /*#__PURE__*/React.createElement("small", {
    style: {
      color: 'rgba(255,255,255,0.4)',
      fontFamily: 'var(--font-body)'
    }
  }, "\xA9 2026 PetLove Care \xB7 Cuidado humanizado para seu melhor amigo")));
}
Object.assign(window, {
  Hero,
  Services,
  About,
  ContactFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.FeedbackCard = __ds_scope.FeedbackCard;

__ds_ns.RatingStars = __ds_scope.RatingStars;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.Sidebar = __ds_scope.Sidebar;

})();
