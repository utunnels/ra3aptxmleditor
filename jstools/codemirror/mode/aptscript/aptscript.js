(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode('aptscript', function() {

  var words = {};
  function define(style, dict) {
    for(var i = 0; i < dict.length; i++) {
      words[dict[i]] = style;
    }
  };

  var commonAtoms = ["regs", "flags", "reg0", "reg1", "reg2", "reg3", "reg4", "reg5", "reg6", "reg7", "reg8", "reg9", "reg10", "reg11", "reg12", "reg13", "reg14", "reg15", "reg16", "reg17", "reg18", "reg19",
  "_global","_parent","_root","_extern",
  "PreloadExtern",
  "PreloadParent",
  "PreloadRoot",
  "SupressSuper",
  "PreloadSuper",
  "SupressArguments",
  "PreloadArguments",
  "SupressThis",
  "PreloadThis",
  "PreloadGlobal"
  ];
  var commonKeywords = ["end", "function","this","super","arguments"];
  var commonCommands = [
  "ActionAdd",
  "ActionCallFrame",
  "ActionChr",
  "ActionDefineFunction",
  "ActionDefineFunction2",
  "ActionDuplicateClip",
  "ActionEnumerate",
  "ActionEqual",
  "ActionInt",
  "ActionLessThan",
  "ActionMBChr",
  "ActionMBLength",
  "ActionMBOrd",
  "ActionMBSubString",
  "ActionNextFrame",
  "ActionOrd",
  "ActionPrevFrame",
  "ActionRandom",
  "ActionSetTarget",
  "ActionSetTargetExpression",
  "ActionShiftLeft",
  "ActionShiftRight",
  "ActionShiftRight2",
  "ActionStartDrag",
  "ActionStopDrag",
  "ActionStopSounds",
  "ActionStringCompare",
  "ActionStringGreater",
  "ActionStringLength",
  "ActionSubString",
  "ActionSwap",
  "ActionTargetPath",
  "ActionToggleQuality",
  "ActionWaitForFrame",
  "ActionWaitForFrameExpression",
  "EAUnknownAction56",
  "EAUnknownAction58",
  "actionEnd",
  "add",
  "and",
  "bitwiseAnd",
  "bitwiseOr",
  "bitwiseXor",
  "callFunction",
  "callMethod",
  "callfp",
  "callfsv",
  "callmp",
  "callmsv",
  "cast",
  "concat",
  "constants",
  "dcallfp",
  "dcallfsv",
  "dcallmp",
  "dcallmsv",
  "decrement",
  "delete",
  "delete2",
  "divide",
  "dup",
  "enumerateValue",
  "equals",
  "extends",
  "getMember",
  "getProperty",
  "getTimer",
  "getURL",
  "getURL2",
  "getVariable",
  "gotoAndPlay",
  "gotoFrame",
  "gotoLabel",
  "greaterThan",
  "implements",
  "increment",
  "initArray",
  "initObject",
  "instanceOf",
  "jmp",
  "jnz",
  "jz",
  "lessThan",
  "modulo",
  "multiply",
  "new",
  "newMethod",
  "not",
  "or",
  "play",
  "pop",
  "push",
  "pushbyte",
  "pushfalse",
  "pushfloat",
  "pushglobalgv",
  "pushlong",
  "pushnull",
  "pushone",
  "pushregister",
  "pushs",
  "pushsdb",
  "pushsdbgm",
  "pushsdbgv",
  "pushsdw",
  "pushsgm",
  "pushsgv",
  "pushshort",
  "pushssm",
  "pushssv",
  "pushthisgv",
  "pushtrue",
  "pushundef",
  "pushzero",
  "pushzerosv",
  "removeClip",
  "return",
  "setMember",
  "setProperty",
  "setRegister",
  "setVariable",
  "stop",
  "strictEquals",
  "stringEq",
  "subtract",
  "throw",
  "toNumber",
  "toString",
  "trace",
  "try",
  "typeof",
  "var",
  "varEquals",
  "with",
  ];
  var commonCommands3 = [
  "ActionAdd",
  "ActionConstantPool",
  "ActionDefineFunction",
  "ActionDefineFunction2",
  "EAUnknownAction56",
  "EAUnknownAction58",
  "add",
  "and",
  "bitand",
  "bitor",
  "callframe",
  "callmethodpop",
  "callmethodpush",
  "callmethodset",
  "callnamedmethodpop",
  "callnamedmethodset",
  "callnamedpop",
  "callnamedset",
  "callpop",
  "callpush",
  "callset",
  "cast",
  "chr",
  "concat",
  "dec",
  "definelocal",
  "delete",
  "delete2",
  "div",
  "dup",
  "duplicateclip",
  "endaction",
  "enum2",
  "enumerate",
  "eq",
  "equals",
  "extends",
  "getmember",
  "getnamedmember",
  "getproperty",
  "getstrmember",
  "getstrvar",
  "gettimer",
  "geturl",
  "geturl2",
  "getvar",
  "gotoexpr",
  "gotoframe",
  "gotolabel",
  "gt",
  "impl",
  "inc",
  "initarray",
  "initobject",
  "instanceof",
  "jump",
  "jumpfalse",
  "jumptrue",
  "lessthan",
  "lsh",
  "lt",
  "mbchr",
  "mbord",
  "mbstrlen",
  "mbsubstr",
  "mod",
  "mul",
  "new",
  "newmethod",
  "nextframe",
  "not",
  "or",
  "ord",
  "play",
  "pop",
  "prevframe",
  "push",
  "pushbyte",
  "pushconst",
  "pushdata",
  "pushfalse",
  "pushfloat",
  "pushglobal",
  "pushlong",
  "pushnull",
  "pushone",
  "pushreg",
  "pushshort",
  "pushstr",
  "pushthis",
  "pushtrue",
  "pushundefined",
  "pushvar",
  "pushwconst",
  "pushzero",
  "random",
  "removeclip",
  "return",
  "rsh",
  "setmember",
  "setproperty",
  "setreg",
  "setstrmember",
  "setstrvar",
  "settarget",
  "settargetexpr",
  "setvar",
  "startdrag",
  "stop",
  "stopdrag",
  "stopsounds",
  "strcmp",
  "streq",
  "strgt",
  "stricteq",
  "strlen",
  "sub",
  "substr",
  "swap",
  "targetpath",
  "throw",
  "togglequality",
  "tointeger",
  "tonumber",
  "tostring",
  "trace",
  "try",
  "typeof",
  "unsignedrsh",
  "var",
  "waitforframe",
  "waitforframeexpr",
  "with",
  "xor",
  "zerovar",
  ];
  var commonCommands2 = [
  "push",
  "ActionEnd", 
  "ActionNextFrame", 
  "ActionPrevFrame", 
  "ActionPlay", 
  "ActionStop", 
  "ActionToggleQuality", 
  "ActionStopSounds", 
  "ActionAdd", 
  "ActionSubtract", 
  "ActionMultiply", 
  "ActionDivide", 
  "ActionEqual", 
  "ActionLessThan", 
  "ActionLogicalAnd", 
  "ActionLogicalOr", 
  "ActionLogicalNot", 
  "ActionStringEq", 
  "ActionStringLength", 
  "ActionSubString", 
  "ActionPop", 
  "ActionInt", 
  "ActionGetVariable", 
  "ActionSetVariable", 
  "ActionSetTargetExpression", 
  "ActionStringConcat", 
  "ActionGetProperty", 
  "ActionSetProperty", 
  "ActionDuplicateClip", 
  "ActionRemoveClip", 
  "ActionTrace", 
  "ActionStartDrag", 
  "ActionStopDrag", 
  "ActionStringCompare", 
  "ActionThrow", 
  "ActionCastOp", 
  "ActionImplementsOp", 
  "ActionRandom", 
  "ActionMBLength", 
  "ActionOrd", 
  "ActionChr", 
  "ActionGetTimer", 
  "ActionMBSubString", 
  "ActionMBOrd", 
  "ActionMBChr", 
  "ActionDelete", 
  "ActionDelete2", 
  "ActionDefineLocal", 
  "ActionCallFunction", 
  "ActionReturn", 
  "ActionModulo", 
  "ActionNew", 
  "ActionVar", 
  "ActionInitArray", 
  "ActionInitObject", 
  "ActionTypeOf", 
  "ActionTargetPath", 
  "ActionEnumerate", 
  "ActionNewAdd", 
  "ActionNewLessThan", 
  "ActionNewEquals", 
  "ActionToNumber", 
  "ActionToString", 
  "ActionDup", 
  "ActionSwap", 
  "ActionGetMember", 
  "ActionSetMember", 
  "ActionIncrement", 
  "ActionDecrement", 
  "ActionCallMethod", 
  "ActionNewMethod", 
  "ActionInstanceOf", 
  "ActionEnum2", 
  "EAUnknownAction56", 
  "EAUnknownAction58", 
  "EAPushZero", 
  "EAPushOne", 
  "EACallFunctionPop", 
  "EACallFunction", 
  "EACAllMethodPop", 
  "EACallMethod", 
  "ActionBitwiseAnd", 
  "ActionBitwiseOr", 
  "ActionBitwiseXor", 
  "ActionShiftLeft", 
  "ActionShiftRight", 
  "ActionShiftRight2", 
  "ActionStrictEq", 
  "ActionGreater", 
  "ActionStringGreater", 
  "ActionExtends", 
  "EAPushThis", 
  "EAPushGlobal", 
  "EAZeroVariable", 
  "EAPushTrue", 
  "EAPushFalse", 
  "EAPushNull", 
  "EAPushUndefined", 
  "ActionGotoFrame", 
  "ActionGetURL", 
  "ActionSetRegister", 
  "ActionConstantPool", 
  "ActionWaitForFrame", 
  "ActionSetTarget", 
  "ActionGotoLabel", 
  "ActionWaitForFrameExpression", 
  "ActionDefineFunction2", 
  "ActionTry", 
  "ActionWith", 
  "ActionPushData", 
  "ActionBranchAlways", 
  "ActionGetURL2", 
  "ActionDefineFunction", 
  "ActionBranchIfTrue", 
  "ActionCallFrame", 
  "ActionGotoExpression", 
  "EAPushString", 
  "EAPushConstant", 
  "EAPushWordConstant", 
  "EAGetStringVar", 
  "EAGetStringMember", 
  "EASetStringVar", 
  "EASetStringMember", 
  "EAPushValueOfVar", 
  "EAGetNamedMember", 
  "EACallNamedFunctionPop", 
  "EACallNamedFunction", 
  "EACallNamedMethodPop", 
  "EACallNamedMethod", 
  "EAPushFloat", 
  "EAPushByte", 
  "EAPushShort", 
  "EAPushLong", 
  "EABranchIfFalse", 
  "EAPushRegister" 
  ];

  if(localStorage.useoldcodestyle=='true'){
    var t = commonCommands;
    commonCommands = commonCommands2;
    commonCommands2 = t;
  }

  CodeMirror.registerHelper("hintWords", "aptscript", commonAtoms.concat(commonKeywords, commonCommands));

  define('atom', commonAtoms);
  define('keyword', commonKeywords);
  define('builtin', commonCommands);

  function tokenBase(stream, state) {
    if (stream.eatSpace()) return null;

    var sol = stream.sol();
    var ch = stream.next();

    if (ch === '\'' || ch === '"') {
      state.tokens.unshift(tokenString(ch, "string"));
      return tokenize(stream, state);
    }
    if (ch === ':' || ch === ',' || ch=== '|') {
      return 'operator';
    }
    if (ch === '(' || ch === ')') {
      return 'brace';
    }
    if (ch === '<') {
      if(stream.match("![CDATA[")) return 'meta';
      else console.log('?');
    }
    if (ch === ']') {
      if(stream.match("]>")) return 'meta';
    }
    if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
      return "number";
    }
    if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
      return 'number';
    }
    if (/\d/.test(ch)) {
      stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
      return 'number';
    }
    stream.eatWhile(/[\w-]/);
    var cur = stream.current();
    return words.hasOwnProperty(cur) ? words[cur] : 'variable';
  }

  function tokenString(quote, style) {
    var close = quote;
    return function(stream, state) {
      var next;
      while ((next = stream.next()) != null) {
        if (next === close) {
          state.tokens.shift();
          break;
        }else if(next==='\\'){
          next = stream.next();
        }
      }
      return style;
    };
  };

  function tokenStringStart(quote, style) {
    return function(stream, state) {
      state.tokens[0] = tokenString(quote, style)
      stream.next()
      return tokenize(stream, state)
    }
  }

  function tokenize(stream, state) {
    return (state.tokens[0] || tokenBase) (stream, state);
  };

  return {
    startState: function() {return {tokens:[]};},
    token: function(stream, state) {
      return tokenize(stream, state);
    },
    //closeBrackets: "()",
    //fold: "brace"
  };
});

CodeMirror.defineMIME('text/aptscript', 'aptscript');
CodeMirror.defineMIME('application/aptscript', 'aptscript');

});
