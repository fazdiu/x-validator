var Be = Object.defineProperty;
var He = (e, t, r) => t in e ? Be(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Te = (e, t, r) => (He(e, typeof t != "symbol" ? t + "" : t, r), r);
const K = "required", Z = "min-string", X = "min-numeric", J = "min-array", O = "min-file", Q = "max-numeric", ee = "max-string", te = "max-array", P = "max-file", re = "between-string", ne = "between-numeric", ie = "between-array", U = "between-file", R = "string", k = "numeric", j = "array", se = "file", ae = "integer", oe = "accepted", ue = "alpha", le = "alphaNum", ce = "equal-to", We = "optional", D = "in", fe = "regex", de = "size-string", me = "size-numeric", he = "starts-with", Ue = "ends-with", ge = "digits", ye = "email", pe = "date", be = "url", $e = "slug", _e = "credit-card", we = "mobile-phone", ve = "strong-password", Ee = "time", Ae = "hex-color", v = "An argument must be provided", C = "The argument must be a number", Ve = "The argument must be a positive number", Ye = "Invalid pattern provided", Ke = "Conflicting data type, you have declared multiple types for the same value.";
function Ze(e) {
  if (e._x_validator_name)
    return e._x_validator_name;
  let t = "";
  return e.hasAttribute("name") ? t = e.getAttribute("name").replaceAll(" ", "_") : t = `_name_rand_${Math.floor(Math.random() * (1e4 - 1) + 1)}_`, e._x_validator_name = t, t;
}
function Xe(e) {
  let [t, r = ""] = e.split(":");
  return {
    name: t,
    argsText: r,
    args: Je(r)
  };
}
function Je(e) {
  return e ? e.split(",") : [];
}
function Fe(e) {
  return e.tagName == "INPUT" ? e.type === "checkbox" || e.type === "radio" ? e.checked ? e.value || "checked" : "" : e.value : e.tagName == "TEXTAREA" ? e.value : e.tagName == "SELECT" ? Array.from(e.selectedOptions).map((t) => t.value) : "";
}
function y(e) {
  return {
    throwError(t) {
      if (e)
        throw new Error(t);
    }
  };
}
function Se(e, t = {}) {
  return Object.keys(t).forEach((r) => {
    e = e.replaceAll(`:${r}`, t[r]);
  }), e;
}
function Qe(e) {
  let t = e.attributes;
  for (let r = 0; r < t.length; r++)
    if (t[r].nodeName.startsWith("x-model"))
      return t[r].value.trim();
  return null;
}
class l {
  constructor(t, r) {
    this.name = t, this.args = r;
  }
}
function et({ value: e = null }) {
  return e === "checked" || new l(oe);
}
function tt({ value: e = "" }) {
  return /^[\p{L}\p{M}\p{N}]+$/u.test(e) || new l(le);
}
function rt({ value: e = "" }) {
  return /^[\p{L}\p{M}]+$/u.test(e) || new l(ue);
}
var z = function(t, r, n, i) {
  this.name = t, this.fn = r, this.args = n, this.modifiers = i;
};
z.prototype._test = function(t) {
  var r = this.fn;
  try {
    F(this.modifiers.slice(), r, this)(t);
  } catch {
    r = function() {
      return !1;
    };
  }
  try {
    return F(this.modifiers.slice(), r, this)(t);
  } catch {
    return !1;
  }
};
z.prototype._check = function(t) {
  try {
    F(this.modifiers.slice(), this.fn, this)(t);
  } catch {
    if (F(this.modifiers.slice(), function(n) {
      return n;
    }, this)(!1))
      return;
  }
  if (!F(this.modifiers.slice(), this.fn, this)(t))
    throw null;
};
z.prototype._testAsync = function(t) {
  var r = this;
  return new Promise(function(n, i) {
    De(
      r.modifiers.slice(),
      r.fn,
      r
    )(t).then(function(s) {
      s ? n(t) : i(null);
    }).catch(function(s) {
      return i(s);
    });
  });
};
function je(e, t) {
  return t === void 0 && (t = "simple"), typeof e == "object" ? e[t] : e;
}
function F(e, t, r) {
  if (e.length) {
    var n = e.shift(), i = F(e, t, r);
    return n.perform(i, r);
  } else
    return je(t);
}
function De(e, t, r) {
  if (e.length) {
    var n = e.shift(), i = De(e, t, r);
    return n.performAsync(i, r);
  } else
    return function(s) {
      return Promise.resolve(je(t, "async")(s));
    };
}
var nt = function(t, r, n) {
  this.name = t, this.perform = r, this.performAsync = n;
}, xe = /* @__PURE__ */ function(e) {
  function t(r, n, i, s) {
    for (var a = [], u = arguments.length - 4; u-- > 0; )
      a[u] = arguments[u + 4];
    e.call(this, a), e.captureStackTrace && e.captureStackTrace(this, t), this.rule = r, this.value = n, this.cause = i, this.target = s;
  }
  return e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t, t;
}(Error), $ = function(t, r) {
  t === void 0 && (t = []), r === void 0 && (r = []), this.chain = t, this.nextRuleModifiers = r;
};
$.prototype._applyRule = function(t, r) {
  var n = this;
  return function() {
    for (var i = [], s = arguments.length; s--; )
      i[s] = arguments[s];
    return n.chain.push(
      new z(r, t.apply(n, i), i, n.nextRuleModifiers)
    ), n.nextRuleModifiers = [], n;
  };
};
$.prototype._applyModifier = function(t, r) {
  return this.nextRuleModifiers.push(
    new nt(r, t.simple, t.async)
  ), this;
};
$.prototype._clone = function() {
  return new $(this.chain.slice(), this.nextRuleModifiers.slice());
};
$.prototype.test = function(t) {
  return this.chain.every(function(r) {
    return r._test(t);
  });
};
$.prototype.testAll = function(t) {
  var r = [];
  return this.chain.forEach(function(n) {
    try {
      n._check(t);
    } catch (i) {
      r.push(new xe(n, t, i));
    }
  }), r;
};
$.prototype.check = function(t) {
  this.chain.forEach(function(r) {
    try {
      r._check(t);
    } catch (n) {
      throw new xe(r, t, n);
    }
  });
};
$.prototype.testAsync = function(t) {
  var r = this;
  return new Promise(function(n, i) {
    qe(t, r.chain.slice(), n, i);
  });
};
function qe(e, t, r, n) {
  if (t.length) {
    var i = t.shift();
    i._testAsync(e).then(
      function() {
        qe(e, t, r, n);
      },
      function(s) {
        n(new xe(i, e, s));
      }
    );
  } else
    r(e);
}
var Re = function(e, t) {
  return t && typeof e == "string" && e.trim().length === 0 ? !0 : e == null;
};
function it(e, t) {
  return t === void 0 && (t = !1), {
    simple: function(r) {
      return Re(r, t) || e.check(r) === void 0;
    },
    async: function(r) {
      return Re(r, t) || e.testAsync(r);
    }
  };
}
function c() {
  return typeof Proxy < "u" ? ke(new $()) : V(new $());
}
var N = {};
c.extend = function(e) {
  Object.assign(N, e);
};
c.clearCustomRules = function() {
  N = {};
};
function ke(e) {
  return new Proxy(e, {
    get: function(r, n) {
      if (n in r)
        return r[n];
      var i = ke(e._clone());
      if (n in q)
        return i._applyModifier(q[n], n);
      if (n in N)
        return i._applyRule(N[n], n);
      if (n in Y)
        return i._applyRule(Y[n], n);
    }
  });
}
function V(e) {
  var t = function(i, s) {
    return Object.keys(i).forEach(function(a) {
      s[a] = function() {
        for (var u = [], o = arguments.length; o--; )
          u[o] = arguments[o];
        var f = V(s._clone()), p = f._applyRule(
          i[a],
          a
        ).apply(void 0, u);
        return p;
      };
    }), s;
  }, r = t(Y, e), n = t(
    N,
    r
  );
  return Object.keys(q).forEach(function(i) {
    Object.defineProperty(n, i, {
      get: function() {
        var s = V(n._clone());
        return s._applyModifier(q[i], i);
      }
    });
  }), n;
}
var q = {
  not: {
    simple: function(e) {
      return function(t) {
        return !e(t);
      };
    },
    async: function(e) {
      return function(t) {
        return Promise.resolve(e(t)).then(function(r) {
          return !r;
        }).catch(function() {
          return !0;
        });
      };
    }
  },
  some: {
    simple: function(e) {
      return function(t) {
        return M(t).some(function(r) {
          try {
            return e(r);
          } catch {
            return !1;
          }
        });
      };
    },
    async: function(e) {
      return function(t) {
        return Promise.all(
          M(t).map(function(r) {
            try {
              return e(r).catch(function() {
                return !1;
              });
            } catch {
              return !1;
            }
          })
        ).then(function(r) {
          return r.some(Boolean);
        });
      };
    }
  },
  every: {
    simple: function(e) {
      return function(t) {
        return t !== !1 && M(t).every(e);
      };
    },
    async: function(e) {
      return function(t) {
        return Promise.all(M(t).map(e)).then(function(r) {
          return r.every(Boolean);
        });
      };
    }
  },
  strict: {
    simple: function(e, t) {
      return function(r) {
        return Ce(t) && r && typeof r == "object" ? Object.keys(t.args[0]).length === Object.keys(r).length && e(r) : e(r);
      };
    },
    async: function(e, t) {
      return function(r) {
        return Promise.resolve(e(r)).then(function(n) {
          return Ce(t) && r && typeof r == "object" ? Object.keys(t.args[0]).length === Object.keys(r).length && n : n;
        }).catch(function() {
          return !1;
        });
      };
    }
  }
};
function Ce(e) {
  return e && e.name === "schema" && e.args.length > 0 && typeof e.args[0] == "object";
}
function M(e) {
  return typeof e == "string" ? e.split("") : e;
}
var Y = {
  // Value
  equal: function(e) {
    return function(t) {
      return t == e;
    };
  },
  exact: function(e) {
    return function(t) {
      return t === e;
    };
  },
  // Types
  number: function(e) {
    return e === void 0 && (e = !0), function(t) {
      return typeof t == "number" && (e || isFinite(t));
    };
  },
  integer: function() {
    return function(e) {
      var t = Number.isInteger || st;
      return t(e);
    };
  },
  numeric: function() {
    return function(e) {
      return !isNaN(parseFloat(e)) && isFinite(e);
    };
  },
  string: function() {
    return T("string");
  },
  boolean: function() {
    return T("boolean");
  },
  undefined: function() {
    return T("undefined");
  },
  null: function() {
    return T("null");
  },
  array: function() {
    return T("array");
  },
  object: function() {
    return T("object");
  },
  instanceOf: function(e) {
    return function(t) {
      return t instanceof e;
    };
  },
  // Pattern
  pattern: function(e) {
    return function(t) {
      return e.test(t);
    };
  },
  lowercase: function() {
    return function(e) {
      return typeof e == "boolean" || e === e.toLowerCase() && e.trim() !== "";
    };
  },
  uppercase: function() {
    return function(e) {
      return e === e.toUpperCase() && e.trim() !== "";
    };
  },
  vowel: function() {
    return function(e) {
      return /^[aeiou]+$/i.test(e);
    };
  },
  consonant: function() {
    return function(e) {
      return /^(?=[^aeiou])([a-z]+)$/i.test(e);
    };
  },
  // Value at
  first: function(e) {
    return function(t) {
      return t[0] == e;
    };
  },
  last: function(e) {
    return function(t) {
      return t[t.length - 1] == e;
    };
  },
  // Length
  empty: function() {
    return function(e) {
      return e.length === 0;
    };
  },
  length: function(e, t) {
    return function(r) {
      return r.length >= e && r.length <= (t || e);
    };
  },
  minLength: function(e) {
    return function(t) {
      return t.length >= e;
    };
  },
  maxLength: function(e) {
    return function(t) {
      return t.length <= e;
    };
  },
  // Range
  negative: function() {
    return function(e) {
      return e < 0;
    };
  },
  positive: function() {
    return function(e) {
      return e >= 0;
    };
  },
  between: function(e, t) {
    return function(r) {
      return r >= e && r <= t;
    };
  },
  range: function(e, t) {
    return function(r) {
      return r >= e && r <= t;
    };
  },
  lessThan: function(e) {
    return function(t) {
      return t < e;
    };
  },
  lessThanOrEqual: function(e) {
    return function(t) {
      return t <= e;
    };
  },
  greaterThan: function(e) {
    return function(t) {
      return t > e;
    };
  },
  greaterThanOrEqual: function(e) {
    return function(t) {
      return t >= e;
    };
  },
  // Divisible
  even: function() {
    return function(e) {
      return e % 2 === 0;
    };
  },
  odd: function() {
    return function(e) {
      return e % 2 !== 0;
    };
  },
  includes: function(e) {
    return function(t) {
      return ~t.indexOf(e);
    };
  },
  schema: function(e) {
    return at(e);
  },
  // branching
  passesAnyOf: function() {
    for (var e = [], t = arguments.length; t--; )
      e[t] = arguments[t];
    return function(r) {
      return e.some(function(n) {
        return n.test(r);
      });
    };
  },
  optional: it
};
function T(e) {
  return function(t) {
    return Array.isArray(t) && e === "array" || t === null && e === "null" || typeof t === e;
  };
}
function st(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
function at(e) {
  return {
    simple: function(t) {
      var r = [];
      if (Object.keys(e).forEach(function(n) {
        var i = e[n];
        try {
          i.check((t || {})[n]);
        } catch (s) {
          s.target = n, r.push(s);
        }
      }), r.length > 0)
        throw r;
      return !0;
    },
    async: function(t) {
      var r = [], n = Object.keys(e).map(function(i) {
        var s = e[i];
        return s.testAsync((t || {})[i]).catch(function(a) {
          a.target = i, r.push(a);
        });
      });
      return Promise.all(n).then(function() {
        if (r.length > 0)
          throw r;
        return !0;
      });
    }
  };
}
function G({ input: e = null }) {
  return typeof (e == null ? void 0 : e.files) > "u", !0;
}
function ot({ value: e = "", args: t = [], type: r = "string", input: n }) {
  let [i, s] = t;
  return y(!i).throwError(v), y(!c().numeric().test(i)).throwError(C), y(!s).throwError(v), y(!c().numeric().test(s)).throwError(C), r === "numeric" ? ut(e, i, s) : r === "string" ? lt(e, i, s) : r === "array" ? ct(e, i, s) : r === "file" ? ft(e, i, s, n) : !0;
}
function ut(e = "", t = 1, r = 1) {
  return c().numeric().test(e) || (e = Number(e)), c().between(t, r).test(e) || new l(ne, { min: t, max: r });
}
function lt(e = "", t = 1, r = 1) {
  return c().minLength(t).test(e) && c().maxLength(r).test(e) ? !0 : new l(re, { min: t, max: r });
}
function ct(e = "", t = 1, r = 1) {
  return c().minLength(t).test(e) && c().maxLength(r).test(e) ? !0 : new l(ie, { min: t, max: r });
}
function ft(e = "", t = 1, r = 1, n) {
  if (G(n) instanceof l)
    return new l(U, { min: t, max: r });
  let i = n.files;
  for (let s = 0; s < i.length; s++)
    if (!c().between(t, r).test(i[s].size))
      return new l(U, { min: t, max: r });
  return !0;
}
function dt({ value: e = "", args: t = [], fields: r = [] }) {
  let [n] = t, i = r.find((s) => s.name == n);
  return when(!n).throwError(ARGUMENT_MUST_BE_PROVIDED), when(!i).throwError(FIELD_NOT_FOUND), c().equal(i.value).test(e) || new l(ce, { field: i == null ? void 0 : i.name });
}
function mt({ value: e = "", args: t = [], type: r = "string", input: n = null }) {
  let [i] = t;
  return y(!i).throwError(v), y(!c().numeric().test(i)).throwError(C), r === "numeric" ? ht(e, i) : r === "string" ? gt(e, i) : r === "array" ? yt(e, i) : r === "file" ? pt(e, i.input, n) : !0;
}
function ht(e = "", t = 1) {
  return c().lessThanOrEqual(t).test(e) || new l(Q, { max: t });
}
function gt(e = "", t = 1) {
  return c().maxLength(t).test(e) || new l(ee, { max: t });
}
function yt(e = "", t = 1) {
  return c().maxLength(t).test(e) || new l(te, { max: t });
}
function pt(e = "", t = 1, r) {
  if (G(r) instanceof l)
    return new l(P, { max: t });
  let n = r.files;
  for (let i = 0; i < n.length; i++)
    if (!c().lessThanOrEqual(t).test(n[i].size))
      return new l(P, { max: t });
  return !0;
}
function bt({ value: e = "", args: t = [], type: r = "string", input: n = null }) {
  let [i] = t;
  return y(!i).throwError(v), y(!c().numeric().test(i)).throwError(C), r === "numeric" ? $t(e, i) : r === "string" ? _t(e, i) : r === "array" ? wt(e, i) : r === "file" ? vt(e, i, n) : !0;
}
function $t(e = "", t = 1) {
  return c().greaterThanOrEqual(t).test(e) || new l(X, { min: t });
}
function _t(e = "", t = 1) {
  return c().minLength(t).test(e) || new l(Z, { min: t });
}
function wt(e = "", t = 1) {
  return c().minLength(t).test(e) || new l(J, { min: t });
}
function vt(e = "", t = 1, r) {
  if (G(r) instanceof l)
    return new l(O, { min: t });
  let n = r.files;
  for (let i = 0; i < n.length; i++)
    if (!c().greaterThanOrEqual(t).test(n[i].size))
      return new l(O, { min: t });
  return !0;
}
function Et({ value: e = "" }) {
  return c().numeric().test(e) || new l(k);
}
function At({ value: e = "" }) {
  return c().empty().test(e) ? new l(K) : !0;
}
function xt({ value: e = "" }) {
  return c().string().test(e) || new l(R);
}
function Tt({ value: e = "", args: t = [] }) {
  let r = t;
  return when(!r).throwError(ARGUMENT_MUST_BE_PROVIDED), Array.isArray(e) ? r.some((n) => e.includes(n)) || new l(D) : c().includes(r).test(e) || new l(D);
}
function Ft({ value: e = "" }) {
  return c().numeric().test(e) && (e = Number(e)), c().integer().test(e) || new l(ae);
}
const St = (e) => {
  try {
    return new RegExp(e), !0;
  } catch {
    return !1;
  }
}, Rt = (e) => {
  var n, i;
  const t = ((n = e.match(/\/(.+)\/.*/)) == null ? void 0 : n[1]) ?? "", r = ((i = e.match(/\/.+\/(.*)/)) == null ? void 0 : i[1]) ?? "";
  return new RegExp(t, r);
};
function Ct({ value: e = "", args: t = [] }) {
  let [r] = t;
  return y(!r).throwError(v), y(St(r) === !1).throwError(Ye), Rt(r).test(e) || new l(fe);
}
function Nt({ value: e = "", args: t = [], type: r = "" }) {
  let [n] = t;
  return y(!n).throwError(v), y(!c().numeric().test(n)).throwError(C), r === "numeric" ? Mt(e, n) : It(e, n);
}
function Mt(e = "", t = 1) {
  const r = Number(e);
  return e !== "" && !Number.isNaN(r) && r === t ? !0 : new l(me, { size: String(t) });
}
function It(e = "", t = 1) {
  return y(t < 0).throwError(Ve), e.length === t ? !0 : new l(de, { size: String(t) });
}
function Lt({ value: e = "", args: t = [] }) {
  let r = t;
  return y(r.length < 1).throwError(v), Array.isArray(e) && (e = e.join("")), r.some((n) => e.startsWith(n)) || new l(he, { values: r.join(",") });
}
function Ot({ value: e = "", args: t = [] }) {
  let [r] = t;
  return y(r === "").throwError(v), y(!c().integer().test(r) || +r < 1).throwError(
    ARGUMENT_MUST_BE_AN_INTEGER
  ), new RegExp(`^-?[0-9]{${r}}$`).test(e) ? !0 : new l(ge, { digits: r });
}
function I(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? I = function(r) {
    return typeof r;
  } : I = function(r) {
    return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
  }, I(e);
}
function b(e) {
  var t = typeof e == "string" || e instanceof String;
  if (!t) {
    var r = I(e);
    throw e === null ? r = "null" : r === "object" && (r = e.constructor.name), new TypeError("Expected a string but received a ".concat(r));
  }
}
function E() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = arguments.length > 1 ? arguments[1] : void 0;
  for (var r in t)
    typeof e[r] > "u" && (e[r] = t[r]);
  return e;
}
function L(e) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? L = function(r) {
    return typeof r;
  } : L = function(r) {
    return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
  }, L(e);
}
function H(e, t) {
  b(e);
  var r, n;
  L(t) === "object" ? (r = t.min || 0, n = t.max) : (r = arguments[1], n = arguments[2]);
  var i = encodeURI(e).split(/%..|./).length - 1;
  return i >= r && (typeof n > "u" || i <= n);
}
var Pt = {
  require_tld: !0,
  allow_underscores: !1,
  allow_trailing_dot: !1,
  allow_numeric_tld: !1,
  allow_wildcard: !1,
  ignore_max_length: !1
};
function ze(e, t) {
  b(e), t = E(t, Pt), t.allow_trailing_dot && e[e.length - 1] === "." && (e = e.substring(0, e.length - 1)), t.allow_wildcard === !0 && e.indexOf("*.") === 0 && (e = e.substring(2));
  var r = e.split("."), n = r[r.length - 1];
  return t.require_tld && (r.length < 2 || !t.allow_numeric_tld && !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(n) || /\s/.test(n)) || !t.allow_numeric_tld && /^\d+$/.test(n) ? !1 : r.every(function(i) {
    return !(i.length > 63 && !t.ignore_max_length || !/^[a-z_\u00a1-\uffff0-9-]+$/i.test(i) || /[\uff01-\uff5e]/.test(i) || /^-|-$/.test(i) || !t.allow_underscores && /_/.test(i));
  });
}
var Ne = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])", w = "(".concat(Ne, "[.]){3}").concat(Ne), Ut = new RegExp("^".concat(w, "$")), m = "(?:[0-9a-fA-F]{1,4})", jt = new RegExp("^(" + "(?:".concat(m, ":){7}(?:").concat(m, "|:)|") + "(?:".concat(m, ":){6}(?:").concat(w, "|:").concat(m, "|:)|") + "(?:".concat(m, ":){5}(?::").concat(w, "|(:").concat(m, "){1,2}|:)|") + "(?:".concat(m, ":){4}(?:(:").concat(m, "){0,1}:").concat(w, "|(:").concat(m, "){1,3}|:)|") + "(?:".concat(m, ":){3}(?:(:").concat(m, "){0,2}:").concat(w, "|(:").concat(m, "){1,4}|:)|") + "(?:".concat(m, ":){2}(?:(:").concat(m, "){0,3}:").concat(w, "|(:").concat(m, "){1,5}|:)|") + "(?:".concat(m, ":){1}(?:(:").concat(m, "){0,4}:").concat(w, "|(:").concat(m, "){1,6}|:)|") + "(?::((?::".concat(m, "){0,5}:").concat(w, "|(?::").concat(m, "){1,7}|:))") + ")(%[0-9a-zA-Z-.:]{1,})?$");
function S(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  return b(e), t = String(t), t ? t === "4" ? Ut.test(e) : t === "6" ? jt.test(e) : !1 : S(e, 4) || S(e, 6);
}
var Dt = {
  allow_display_name: !1,
  require_display_name: !1,
  allow_utf8_local_part: !0,
  require_tld: !0,
  blacklisted_chars: "",
  ignore_max_length: !1,
  host_blacklist: [],
  host_whitelist: []
}, qt = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i, kt = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i, zt = /^[a-z\d]+$/, Gt = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i, Bt = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i, Ht = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i, Wt = 254;
function Vt(e) {
  var t = e.replace(/^"(.+)"$/, "$1");
  if (!t.trim())
    return !1;
  var r = /[\.";<>]/.test(t);
  if (r) {
    if (t === e)
      return !1;
    var n = t.split('"').length === t.split('\\"').length;
    if (!n)
      return !1;
  }
  return !0;
}
function Yt(e, t) {
  if (b(e), t = E(t, Dt), t.require_display_name || t.allow_display_name) {
    var r = e.match(qt);
    if (r) {
      var n = r[1];
      if (e = e.replace(n, "").replace(/(^<|>$)/g, ""), n.endsWith(" ") && (n = n.slice(0, -1)), !Vt(n))
        return !1;
    } else if (t.require_display_name)
      return !1;
  }
  if (!t.ignore_max_length && e.length > Wt)
    return !1;
  var i = e.split("@"), s = i.pop(), a = s.toLowerCase();
  if (t.host_blacklist.includes(a) || t.host_whitelist.length > 0 && !t.host_whitelist.includes(a))
    return !1;
  var u = i.join("@");
  if (t.domain_specific_validation && (a === "gmail.com" || a === "googlemail.com")) {
    u = u.toLowerCase();
    var o = u.split("+")[0];
    if (!H(o.replace(/\./g, ""), {
      min: 6,
      max: 30
    }))
      return !1;
    for (var f = o.split("."), p = 0; p < f.length; p++)
      if (!zt.test(f[p]))
        return !1;
  }
  if (t.ignore_max_length === !1 && (!H(u, {
    max: 64
  }) || !H(s, {
    max: 254
  })))
    return !1;
  if (!ze(s, {
    require_tld: t.require_tld,
    ignore_max_length: t.ignore_max_length
  })) {
    if (!t.allow_ip_domain)
      return !1;
    if (!S(s)) {
      if (!s.startsWith("[") || !s.endsWith("]"))
        return !1;
      var h = s.slice(1, -1);
      if (h.length === 0 || !S(h))
        return !1;
    }
  }
  if (u[0] === '"')
    return u = u.slice(1, u.length - 1), t.allow_utf8_local_part ? Ht.test(u) : Gt.test(u);
  for (var A = t.allow_utf8_local_part ? Bt : kt, g = u.split("."), _ = 0; _ < g.length; _++)
    if (!A.test(g[_]))
      return !1;
  return !(t.blacklisted_chars && u.search(new RegExp("[".concat(t.blacklisted_chars, "]+"), "g")) !== -1);
}
function Kt({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), Yt(String(e)) || new l(ye);
}
function Zt(e, t) {
  return Qt(e) || Jt(e, t) || Ge(e, t) || Xt();
}
function Xt() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Jt(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, i = !1, s = void 0;
    try {
      for (var a = e[Symbol.iterator](), u; !(n = (u = a.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0)
        ;
    } catch (o) {
      i = !0, s = o;
    } finally {
      try {
        !n && a.return != null && a.return();
      } finally {
        if (i)
          throw s;
      }
    }
    return r;
  }
}
function Qt(e) {
  if (Array.isArray(e))
    return e;
}
function er(e, t) {
  var r;
  if (typeof Symbol > "u" || e[Symbol.iterator] == null) {
    if (Array.isArray(e) || (r = Ge(e)) || t && e && typeof e.length == "number") {
      r && (e = r);
      var n = 0, i = function() {
      };
      return { s: i, n: function() {
        return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
      }, e: function(f) {
        throw f;
      }, f: i };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var s = !0, a = !1, u;
  return { s: function() {
    r = e[Symbol.iterator]();
  }, n: function() {
    var f = r.next();
    return s = f.done, f;
  }, e: function(f) {
    a = !0, u = f;
  }, f: function() {
    try {
      !s && r.return != null && r.return();
    } finally {
      if (a)
        throw u;
    }
  } };
}
function Ge(e, t) {
  if (e) {
    if (typeof e == "string")
      return Me(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Me(e, t);
  }
}
function Me(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
var Ie = {
  format: "YYYY/MM/DD",
  delimiters: ["/", "-"],
  strictMode: !1
};
function tr(e) {
  return /(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(e);
}
function rr(e, t) {
  for (var r = [], n = Math.min(e.length, t.length), i = 0; i < n; i++)
    r.push([e[i], t[i]]);
  return r;
}
function nr(e, t) {
  if (typeof t == "string" ? t = E({
    format: t
  }, Ie) : t = E(t, Ie), typeof e == "string" && tr(t.format)) {
    var r = t.delimiters.find(function(h) {
      return t.format.indexOf(h) !== -1;
    }), n = t.strictMode ? r : t.delimiters.find(function(h) {
      return e.indexOf(h) !== -1;
    }), i = rr(e.split(n), t.format.toLowerCase().split(r)), s = {}, a = er(i), u;
    try {
      for (a.s(); !(u = a.n()).done; ) {
        var o = Zt(u.value, 2), f = o[0], p = o[1];
        if (f.length !== p.length)
          return !1;
        s[p.charAt(0)] = f;
      }
    } catch (h) {
      a.e(h);
    } finally {
      a.f();
    }
    return new Date("".concat(s.m, "/").concat(s.d, "/").concat(s.y)).getDate() === +s.d;
  }
  return t.strictMode ? !1 : Object.prototype.toString.call(e) === "[object Date]" && isFinite(e);
}
function ir({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), nr(String(isEmail)) || new l(pe);
}
function sr(e, t) {
  return lr(e) || ur(e, t) || or(e, t) || ar();
}
function ar() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function or(e, t) {
  if (e) {
    if (typeof e == "string")
      return Le(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Le(e, t);
  }
}
function Le(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function ur(e, t) {
  if (!(typeof Symbol > "u" || !(Symbol.iterator in Object(e)))) {
    var r = [], n = !0, i = !1, s = void 0;
    try {
      for (var a = e[Symbol.iterator](), u; !(n = (u = a.next()).done) && (r.push(u.value), !(t && r.length === t)); n = !0)
        ;
    } catch (o) {
      i = !0, s = o;
    } finally {
      try {
        !n && a.return != null && a.return();
      } finally {
        if (i)
          throw s;
      }
    }
    return r;
  }
}
function lr(e) {
  if (Array.isArray(e))
    return e;
}
var cr = {
  protocols: ["http", "https", "ftp"],
  require_tld: !0,
  require_protocol: !1,
  require_host: !0,
  require_port: !1,
  require_valid_protocol: !0,
  allow_underscores: !1,
  allow_trailing_dot: !1,
  allow_protocol_relative_urls: !1,
  allow_fragments: !0,
  allow_query_components: !0,
  validate_length: !0
}, fr = /^\[([^\]]+)\](?::([0-9]+))?$/;
function dr(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
function Oe(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    if (e === n || dr(n) && n.test(e))
      return !0;
  }
  return !1;
}
function mr(e, t) {
  if (b(e), !e || /[\s<>]/.test(e) || e.indexOf("mailto:") === 0 || (t = E(t, cr), t.validate_length && e.length >= 2083) || !t.allow_fragments && e.includes("#") || !t.allow_query_components && (e.includes("?") || e.includes("&")))
    return !1;
  var r, n, i, s, a, u, o, f;
  if (o = e.split("#"), e = o.shift(), o = e.split("?"), e = o.shift(), o = e.split("://"), o.length > 1) {
    if (r = o.shift().toLowerCase(), t.require_valid_protocol && t.protocols.indexOf(r) === -1)
      return !1;
  } else {
    if (t.require_protocol)
      return !1;
    if (e.slice(0, 2) === "//") {
      if (!t.allow_protocol_relative_urls)
        return !1;
      o[0] = e.slice(2);
    }
  }
  if (e = o.join("://"), e === "")
    return !1;
  if (o = e.split("/"), e = o.shift(), e === "" && !t.require_host)
    return !0;
  if (o = e.split("@"), o.length > 1) {
    if (t.disallow_auth || o[0] === "" || (n = o.shift(), n.indexOf(":") >= 0 && n.split(":").length > 2))
      return !1;
    var p = n.split(":"), h = sr(p, 2), A = h[0], g = h[1];
    if (A === "" && g === "")
      return !1;
  }
  s = o.join("@"), u = null, f = null;
  var _ = s.match(fr);
  if (_ ? (i = "", f = _[1], u = _[2] || null) : (o = s.split(":"), i = o.shift(), o.length && (u = o.join(":"))), u !== null && u.length > 0) {
    if (a = parseInt(u, 10), !/^[0-9]+$/.test(u) || a <= 0 || a > 65535)
      return !1;
  } else if (t.require_port)
    return !1;
  return t.host_whitelist ? Oe(i, t.host_whitelist) : i === "" && !t.require_host ? !0 : !(!S(i) && !ze(i, t) && (!f || !S(f, 6)) || (i = i || f, t.host_blacklist && Oe(i, t.host_blacklist)));
}
function hr({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), mr(String(e)) || new l(be);
}
var d = {
  "am-AM": /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
  "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
  "ar-BH": /^(\+?973)?(3|6)\d{7}$/,
  "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
  "ar-LB": /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
  "ar-EG": /^((\+?20)|0)?1[0125]\d{8}$/,
  "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
  "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
  "ar-KW": /^(\+?965)([569]\d{7}|41\d{6})$/,
  "ar-LY": /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
  "ar-MA": /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
  "ar-OM": /^((\+|00)968)?(9[1-9])\d{6}$/,
  "ar-PS": /^(\+?970|0)5[6|9](\d{7})$/,
  "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
  "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
  "ar-TN": /^(\+?216)?[2459]\d{7}$/,
  "az-AZ": /^(\+994|0)(10|5[015]|7[07]|99)\d{7}$/,
  "bs-BA": /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
  "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
  "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
  "bn-BD": /^(\+?880|0)1[13456789][0-9]{8}$/,
  "ca-AD": /^(\+376)?[346]\d{5}$/,
  "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "de-DE": /^((\+49|0)1)(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
  "de-AT": /^(\+43|0)\d{1,4}\d{3,12}$/,
  "de-CH": /^(\+41|0)([1-9])\d{1,9}$/,
  "de-LU": /^(\+352)?((6\d1)\d{6})$/,
  "dv-MV": /^(\+?960)?(7[2-9]|9[1-9])\d{5}$/,
  "el-GR": /^(\+?30|0)?6(8[5-9]|9(?![26])[0-9])\d{7}$/,
  "el-CY": /^(\+?357?)?(9(9|6)\d{6})$/,
  "en-AI": /^(\+?1|0)264(?:2(35|92)|4(?:6[1-2]|76|97)|5(?:3[6-9]|8[1-4])|7(?:2(4|9)|72))\d{4}$/,
  "en-AU": /^(\+?61|0)4\d{8}$/,
  "en-AG": /^(?:\+1|1)268(?:464|7(?:1[3-9]|[28]\d|3[0246]|64|7[0-689]))\d{4}$/,
  "en-BM": /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}$))/,
  "en-BS": /^(\+?1[-\s]?|0)?\(?242\)?[-\s]?\d{3}[-\s]?\d{4}$/,
  "en-GB": /^(\+?44|0)7\d{9}$/,
  "en-GG": /^(\+?44|0)1481\d{6}$/,
  "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,
  "en-GY": /^(\+592|0)6\d{6}$/,
  "en-HK": /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
  "en-MO": /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
  "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
  "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
  "en-JM": /^(\+?876)?\d{7}$/,
  "en-KE": /^(\+?254|0)(7|1)\d{8}$/,
  "en-SS": /^(\+?211|0)(9[1257])\d{7}$/,
  "en-KI": /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
  "en-KN": /^(?:\+1|1)869(?:46\d|48[89]|55[6-8]|66\d|76[02-7])\d{4}$/,
  "en-LS": /^(\+?266)(22|28|57|58|59|27|52)\d{6}$/,
  "en-MT": /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
  "en-MU": /^(\+?230|0)?\d{8}$/,
  "en-NA": /^(\+?264|0)(6|8)\d{7}$/,
  "en-NG": /^(\+?234|0)?[789]\d{9}$/,
  "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
  "en-PG": /^(\+?675|0)?(7\d|8[18])\d{6}$/,
  "en-PK": /^((00|\+)?92|0)3[0-6]\d{8}$/,
  "en-PH": /^(09|\+639)\d{9}$/,
  "en-RW": /^(\+?250|0)?[7]\d{8}$/,
  "en-SG": /^(\+65)?[3689]\d{7}$/,
  "en-SL": /^(\+?232|0)\d{8}$/,
  "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
  "en-UG": /^(\+?256|0)?[7]\d{8}$/,
  "en-US": /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
  "en-ZA": /^(\+?27|0)\d{9}$/,
  "en-ZM": /^(\+?26)?09[567]\d{7}$/,
  "en-ZW": /^(\+263)[0-9]{9}$/,
  "en-BW": /^(\+?267)?(7[1-8]{1})\d{6}$/,
  "es-AR": /^\+?549(11|[2368]\d)\d{8}$/,
  "es-BO": /^(\+?591)?(6|7)\d{7}$/,
  "es-CO": /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
  "es-CL": /^(\+?56|0)[2-9]\d{1}\d{7}$/,
  "es-CR": /^(\+506)?[2-8]\d{7}$/,
  "es-CU": /^(\+53|0053)?5\d{7}/,
  "es-DO": /^(\+?1)?8[024]9\d{7}$/,
  "es-HN": /^(\+?504)?[9|8|3|2]\d{7}$/,
  "es-EC": /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
  "es-ES": /^(\+?34)?[6|7]\d{8}$/,
  "es-PE": /^(\+?51)?9\d{8}$/,
  "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
  "es-NI": /^(\+?505)\d{7,8}$/,
  "es-PA": /^(\+?507)\d{7,8}$/,
  "es-PY": /^(\+?595|0)9[9876]\d{7}$/,
  "es-SV": /^(\+?503)?[67]\d{7}$/,
  "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
  "es-VE": /^(\+?58)?(2|4)\d{9}$/,
  "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
  "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
  "fi-FI": /^(\+?358|0)\s?(4[0-6]|50)\s?(\d\s?){4,8}$/,
  "fj-FJ": /^(\+?679)?\s?\d{3}\s?\d{4}$/,
  "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "fr-BF": /^(\+226|0)[67]\d{7}$/,
  "fr-BJ": /^(\+229)\d{8}$/,
  "fr-CD": /^(\+?243|0)?(8|9)\d{8}$/,
  "fr-CM": /^(\+?237)6[0-9]{8}$/,
  "fr-FR": /^(\+?33|0)[67]\d{8}$/,
  "fr-GF": /^(\+?594|0|00594)[67]\d{8}$/,
  "fr-GP": /^(\+?590|0|00590)[67]\d{8}$/,
  "fr-MQ": /^(\+?596|0|00596)[67]\d{8}$/,
  "fr-PF": /^(\+?689)?8[789]\d{6}$/,
  "fr-RE": /^(\+?262|0|00262)[67]\d{8}$/,
  "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
  "hu-HU": /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
  "id-ID": /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
  "ir-IR": /^(\+98|0)?9\d{9}$/,
  "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
  "it-SM": /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
  "ja-JP": /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
  "ka-GE": /^(\+?995)?(79\d{7}|5\d{8})$/,
  "kk-KZ": /^(\+?7|8)?7\d{9}$/,
  "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
  "ko-KR": /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
  "ky-KG": /^(\+?7\s?\+?7|0)\s?\d{2}\s?\d{3}\s?\d{4}$/,
  "lt-LT": /^(\+370|8)\d{8}$/,
  "lv-LV": /^(\+?371)2\d{7}$/,
  "mg-MG": /^((\+?261|0)(2|3)\d)?\d{7}$/,
  "mn-MN": /^(\+|00|011)?976(77|81|88|91|94|95|96|99)\d{6}$/,
  "my-MM": /^(\+?959|09|9)(2[5-7]|3[1-2]|4[0-5]|6[6-9]|7[5-9]|9[6-9])[0-9]{7}$/,
  "ms-MY": /^(\+?60|0)1(([0145](-|\s)?\d{7,8})|([236-9](-|\s)?\d{7}))$/,
  "mz-MZ": /^(\+?258)?8[234567]\d{7}$/,
  "nb-NO": /^(\+?47)?[49]\d{7}$/,
  "ne-NP": /^(\+?977)?9[78]\d{8}$/,
  "nl-BE": /^(\+?32|0)4\d{8}$/,
  "nl-NL": /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
  "nl-AW": /^(\+)?297(56|59|64|73|74|99)\d{5}$/,
  "nn-NO": /^(\+?47)?[49]\d{7}$/,
  "pl-PL": /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
  "pt-BR": /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[1-9]{1}\d{3}\-?\d{4}))$/,
  "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
  "pt-AO": /^(\+244)\d{9}$/,
  "ro-MD": /^(\+?373|0)((6(0|1|2|6|7|8|9))|(7(6|7|8|9)))\d{6}$/,
  "ro-RO": /^(\+?40|0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/,
  "ru-RU": /^(\+?7|8)?9\d{9}$/,
  "si-LK": /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
  "sl-SI": /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
  "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
  "sq-AL": /^(\+355|0)6[789]\d{6}$/,
  "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
  "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
  "tg-TJ": /^(\+?992)?[5][5]\d{7}$/,
  "th-TH": /^(\+66|66|0)\d{9}$/,
  "tr-TR": /^(\+?90|0)?5\d{9}$/,
  "tk-TM": /^(\+993|993|8)\d{8}$/,
  "uk-UA": /^(\+?38|8)?0\d{9}$/,
  "uz-UZ": /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
  "vi-VN": /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
  "zh-CN": /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
  "zh-TW": /^(\+?886\-?|0)?9\d{8}$/,
  "dz-BT": /^(\+?975|0)?(17|16|77|02)\d{6}$/,
  "ar-YE": /^(((\+|00)9677|0?7)[0137]\d{7}|((\+|00)967|0)[1-7]\d{6})$/,
  "ar-EH": /^(\+?212|0)[\s\-]?(5288|5289)[\s\-]?\d{5}$/,
  "fa-AF": /^(\+93|0)?(2{1}[0-8]{1}|[3-5]{1}[0-4]{1})(\d{7})$/
};
d["en-CA"] = d["en-US"];
d["fr-CA"] = d["en-CA"];
d["fr-BE"] = d["nl-BE"];
d["zh-HK"] = d["en-HK"];
d["zh-MO"] = d["en-MO"];
d["ga-IE"] = d["en-IE"];
d["fr-CH"] = d["de-CH"];
d["it-CH"] = d["fr-CH"];
function gr(e, t, r) {
  if (b(e), r && r.strictMode && !e.startsWith("+"))
    return !1;
  if (Array.isArray(t))
    return t.some(function(s) {
      if (d.hasOwnProperty(s)) {
        var a = d[s];
        if (a.test(e))
          return !0;
      }
      return !1;
    });
  if (t in d)
    return d[t].test(e);
  if (!t || t === "any") {
    for (var n in d)
      if (d.hasOwnProperty(n)) {
        var i = d[n];
        if (i.test(e))
          return !0;
      }
    return !1;
  }
  throw new Error("Invalid locale '".concat(t, "'"));
}
function yr({ value: e = "", args: t = [] }) {
  let r = t;
  return Array.isArray(e) && (e = e.join("")), gr(String(e), r) || new l(we);
}
var pr = /^[A-Z]$/, br = /^[a-z]$/, $r = /^[0-9]$/, _r = /^[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/, wr = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  returnScore: !1,
  pointsPerUnique: 1,
  pointsPerRepeat: 0.5,
  pointsForContainingLower: 10,
  pointsForContainingUpper: 10,
  pointsForContainingNumber: 10,
  pointsForContainingSymbol: 10
};
function vr(e) {
  var t = {};
  return Array.from(e).forEach(function(r) {
    var n = t[r];
    n ? t[r] += 1 : t[r] = 1;
  }), t;
}
function Er(e) {
  var t = vr(e), r = {
    length: e.length,
    uniqueChars: Object.keys(t).length,
    uppercaseCount: 0,
    lowercaseCount: 0,
    numberCount: 0,
    symbolCount: 0
  };
  return Object.keys(t).forEach(function(n) {
    pr.test(n) ? r.uppercaseCount += t[n] : br.test(n) ? r.lowercaseCount += t[n] : $r.test(n) ? r.numberCount += t[n] : _r.test(n) && (r.symbolCount += t[n]);
  }), r;
}
function Ar(e, t) {
  var r = 0;
  return r += e.uniqueChars * t.pointsPerUnique, r += (e.length - e.uniqueChars) * t.pointsPerRepeat, e.lowercaseCount > 0 && (r += t.pointsForContainingLower), e.uppercaseCount > 0 && (r += t.pointsForContainingUpper), e.numberCount > 0 && (r += t.pointsForContainingNumber), e.symbolCount > 0 && (r += t.pointsForContainingSymbol), r;
}
function xr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  b(e);
  var r = Er(e);
  return t = E(t || {}, wr), t.returnScore ? Ar(r, t) : r.length >= t.minLength && r.lowercaseCount >= t.minLowercase && r.uppercaseCount >= t.minUppercase && r.numberCount >= t.minNumbers && r.symbolCount >= t.minSymbols;
}
function Tr({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), xr(String(e)) || new l(ve);
}
var Fr = /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;
function Sr(e) {
  return b(e), Fr.test(e);
}
function Rr({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), Sr(String(e)) || new l($e);
}
var Cr = {
  hourFormat: "hour24",
  mode: "default"
}, Nr = {
  hour24: {
    default: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
    withSeconds: /^([01]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
  },
  hour12: {
    default: /^(0?[1-9]|1[0-2]):([0-5][0-9]) (A|P)M$/,
    withSeconds: /^(0?[1-9]|1[0-2]):([0-5][0-9]):([0-5][0-9]) (A|P)M$/
  }
};
function Mr(e, t) {
  return t = E(t, Cr), typeof e != "string" ? !1 : Nr[t.hourFormat][t.mode].test(e);
}
function Ir({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), Mr(String(e)) || new l(Ee);
}
var Lr = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
function Or(e) {
  return b(e), Lr.test(e);
}
function Pr({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), Or(String(e)) || new l(Ae);
}
function Ur(e) {
  b(e);
  for (var t = e.replace(/[- ]+/g, ""), r = 0, n, i, s, a = t.length - 1; a >= 0; a--)
    n = t.substring(a, a + 1), i = parseInt(n, 10), s ? (i *= 2, i >= 10 ? r += i % 10 + 1 : r += i) : r += i, s = !s;
  return !!(r % 10 === 0 && t);
}
var W = {
  amex: /^3[47][0-9]{13}$/,
  dinersclub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
  discover: /^6(?:011|5[0-9][0-9])[0-9]{12,15}$/,
  jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  mastercard: /^5[1-5][0-9]{2}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
  // /^[25][1-7][0-9]{14}$/;
  unionpay: /^(6[27][0-9]{14}|^(81[0-9]{14,17}))$/,
  visa: /^(?:4[0-9]{12})(?:[0-9]{3,6})?$/
}, jr = /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/;
function Dr(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  b(e);
  var r = t.provider, n = e.replace(/[- ]+/g, "");
  if (r && r.toLowerCase() in W) {
    if (!W[r.toLowerCase()].test(n))
      return !1;
  } else {
    if (r && !(r.toLowerCase() in W))
      throw new Error("".concat(r, " is not a valid credit card provider."));
    if (!jr.test(n))
      return !1;
  }
  return Ur(e);
}
function qr({ value: e = "" }) {
  return Array.isArray(e) && (e = e.join("")), Dr(String(e)) || new l(_e);
}
const kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accepted: et,
  alpha: rt,
  alphaNum: tt,
  between: ot,
  creditCard: qr,
  date: ir,
  digits: Ot,
  email: Kt,
  equalTo: dt,
  file: G,
  hexColor: Pr,
  in: Tt,
  integer: Ft,
  max: mt,
  min: bt,
  mobilePhone: yr,
  numeric: Et,
  regex: Ct,
  required: At,
  size: Nt,
  slug: Rr,
  startsWith: Lt,
  string: xt,
  strongPassword: Tr,
  time: Ir,
  url: hr
}, Symbol.toStringTag, { value: "Module" })), zr = {
  DEFAULT: "The field is invalid.",
  [K]: "The field is required.",
  [Z]: "The field must be at least :min characters.",
  [X]: "The field must be at least :min.",
  [J]: "The field must have at least :min items selected.",
  [O]: "The file must be at least :min kilobytes.",
  [ee]: "The field must not be greater than :max characters.",
  [Q]: "The field must not be greater than :max.",
  [te]: "The field must not have more than :max items selected.",
  [P]: "The field must not be greater than :max kilobytes.",
  [re]: "The field must be between :min and :max characters.",
  [ne]: "The field must be between :min and :max.",
  [ie]: "The field must have between :min and :max items selected.",
  [U]: "The field must be between :min and :max kilobytes.",
  [R]: "The field must be a string.",
  [k]: "The field must be a number.",
  [j]: "The field must be an array.",
  [se]: "The field must be a file.",
  [ae]: "The field must be an integer.",
  [oe]: "The field must be accepted.",
  [ue]: "The field must only contain letters.",
  [le]: "The field must only contain letters and numbers.",
  [ce]: "The field must be a equal to :field.",
  [D]: "The selected item is invalid.",
  [fe]: "The field format is invalid.",
  [de]: "The field must be :size characters.",
  [me]: "The field must be :size.",
  [he]: "The field must start with one of the following: :values.",
  [Ue]: "The field must end with one of the following: :values.",
  [ge]: "The field must be :digits digits.",
  [ye]: "The field must be a valid email address.",
  [pe]: "The field is not a valid date.",
  [be]: "The field is not a valid URL.",
  [$e]: "The field format is invalid.",
  [_e]: "The credit card number is invalid.",
  [we]: "The mobile phone number is invalid.",
  [ve]: "The entered value cannot be considered as a strong password.",
  [Ee]: "The field is not a valid time.",
  [Ae]: "The value is not a hexadecimal color."
}, Gr = {
  DEFAULT: "El campo no es válido.",
  [K]: "El campo es obligatorio.",
  [Z]: "El campo debe tener al menos :min caracteres.",
  [X]: "El campo debe ser al menos :min.",
  [J]: "El campo debe tener al menos :min elementos seleccionados.",
  [O]: "El archivo debe tener al menos :min kilobytes.",
  [ee]: "El campo no debe tener más de :max caracteres.",
  [Q]: "El campo no debe ser mayor que :max.",
  [te]: "El campo no debe tener más de :max elementos seleccionados.",
  [P]: "El campo no debe ser mayor que :max kilobytes.",
  [re]: "El campo debe tener entre :min y :max caracteres.",
  [ne]: "El campo debe estar entre :min y :max.",
  [ie]: "El campo debe tener entre :min y :max elementos seleccionados.",
  [U]: "El campo debe estar entre :min y :max kilobytes.",
  [R]: "El campo debe ser una cadena.",
  [k]: "El campo debe ser un número.",
  [j]: "El campo debe ser una matriz.",
  [se]: "El campo debe ser un archivo.",
  [ae]: "El campo debe ser un número entero.",
  [oe]: "El campo debe ser aceptado.",
  [ue]: "El campo solo debe contener letras.",
  [le]: "El campo solo debe contener letras y números.",
  [ce]: "El campo debe ser igual a :field.",
  [D]: "El elemento seleccionado no es válido.",
  [fe]: "El formato del campo no es válido.",
  [de]: "El campo debe tener :size de caracteres.",
  [me]: "El campo debe ser :size.",
  [he]: "El campo debe comenzar con uno de los siguientes: :values.",
  [Ue]: "El campo debe terminar con uno de los siguientes: :values.",
  [ge]: "El campo debe tener :digits dígitos",
  [ye]: "El campo debe ser una dirección de correo electrónico válida.",
  [pe]: "El campo no es una fecha válida.",
  [be]: "El campo no es una URL válida.",
  [$e]: "El formato del campo no es válido.",
  [_e]: "El número de la tarjeta de crédito es inválido.",
  [we]: "El número de teléfono móvil no es válido.",
  [ve]: "El valor ingresado no se puede considerar como una contraseña segura.",
  [Ee]: "El campo no es una hora válida.",
  [Ae]: "El valor no es un color hexadecimal."
}, Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  en: zr,
  es: Gr
}, Symbol.toStringTag, { value: "Module" }));
class Br {
  constructor({ el: t, options: r = {}, Alpine: n }) {
    // errorsList = {};
    Te(this, "watchList", []);
    var u;
    const i = {
      mode: "change",
      delay: 300,
      lang: "en",
      rules: {},
      messages: {}
    };
    this.options = Object.assign(i, r), this.el = t, this.Alpine = n, this.setLanguage("en"), this.messages = Object.assign(this.messages, this.options.messages), this.rules = { ...this.options.rules, ...kr }, this.options.mode === "change" && this.validateOnFieldChange();
    const s = (u = this.Alpine.$data(t).validator) == null ? void 0 : u.error, a = typeof s == "object" && s !== null ? s : {};
    this.Alpine.$data(t).validator = {
      error: a,
      errors: {},
      validate: (o) => this.validate(o),
      init: (o) => this.validate(o, !1),
      setLanguage: (o) => {
        this.setLanguage(o);
      }
    };
  }
  setLanguage(t) {
    Object.keys(Pe).includes(t) && (this.messages = Pe[t]);
  }
  init(t) {
    this.validate(t, !1);
  }
  validate(t, r = !0) {
    let n = !0, i = !0, s = [];
    return t == null && (t = this.el.querySelectorAll("[x-rules],[data-rules]")), t.length > 0 && this.validateFields(Array.from(t), r).then(s), n = Object.values(s).filter((a) => a).length === 0, i = n ? "success" : "failed", t == null && this.el.dispatchEvent(
      new CustomEvent(`validator.${i}`, {
        detail: {
          errors: s
        }
      })
    ), n;
  }
  async validateFields(t = [], r = !0) {
    let n = {};
    for (const i of t) {
      const s = Ze(i), a = this.extractRules(i);
      let u = {};
      if (r) {
        if (a && a.length > 0) {
          let h = Fe(i);
          this.isArray(a) && (h = Array.from(
            this.el.querySelectorAll(`[name="${s}"]`)
          ).map((g) => Fe(g)).flatMap((g) => g).filter((g) => g));
          for (const A of a) {
            const { name: g, args: _ } = A;
            if (this.isOptional(a) && (h === "" || h.length === 0))
              break;
            if (g in this.rules)
              try {
                const x = await this.rules[g]({
                  value: h,
                  args: _,
                  fields: t,
                  type: this.getType(a, i),
                  input: i
                });
                if (x instanceof l) {
                  const B = Se(
                    this.messages[x.name] || this.messages.DEFAULT,
                    x.args
                  );
                  u[g] = B;
                }
                if (x === !1) {
                  const B = Se(
                    this.messages[g] || this.messages.DEFAULT
                  );
                  u[g] = B;
                }
              } catch (x) {
                return console.error(new Error(`${g}: ${x.message}`)), !1;
              }
          }
        }
        const o = Object.values(u), f = o[0] || "";
        n[s] = f, this.Alpine.$data(this.el).validator.error[s] = f, this.Alpine.$data(this.el).validator.errors[s] = u;
        const p = o.filter((h) => h).length < 1 ? "valid" : "invalid";
        i.dispatchEvent(
          new CustomEvent(`field.${p}`, {
            detail: {
              errors: u
            }
          })
        );
      }
    }
    return n;
  }
  validateOnFieldChange() {
    let t = null;
    this.el.addEventListener("input", (r) => {
      window.clearTimeout(t);
      const n = this.options.delay;
      t = window.setTimeout(() => {
        const i = r.target;
        i.matches("[data-rules],[x-rules]") && this.validate([i]);
      }, n);
    });
  }
  isArray(t) {
    return t.some((r) => r.name === j);
  }
  isOptional(t) {
    return t.some((r) => r.name === We);
  }
  getType(t, r) {
    const n = [R, k, j, se], i = t.filter((s) => n.includes(s.name));
    if (i.length > 1) {
      const s = `${Ke} (${i.map((a) => a.name).join(",")})`;
      console.error(new Error(s), r);
    }
    return i.length == 1 ? i[0].name : R;
  }
  extractRules(t) {
    var i;
    let r = [].concat(((i = t.getAttribute("data-rules")) == null ? void 0 : i.split("|")) || []), n = t.getAttribute("x-rules") || null;
    if (n) {
      let s = [];
      s = this.Alpine.evaluate(t, n), Array.isArray(s) && (r = r.concat(s)), typeof s == "string" && (r = r.concat((s == null ? void 0 : s.split("|")) || []));
    }
    return r.filter((s) => s).map((s) => Xe(s));
  }
}
const Wr = function(e) {
  e.directive("validator", (t, { expression: r }, { evaluate: n }) => {
    r = r.trim();
    let i = {};
    r && (i = n(r)), new Br({ el: t, options: i, Alpine: e });
  }), e.directive("rules", (t, { expression: r }, { evaluate: n }) => {
    const i = e.$data(t), s = Qe(t), a = i.validator, u = e.$data(t)[r];
    a && a.init([t]), typeof u < "u" && i.$watch(r, (o) => {
      a.validate([t]);
    }), s && i.$nextTick(() => {
      i.$watch(s, (o) => {
        a.validate([t]);
      });
    });
  });
};
export {
  Wr as default
};
