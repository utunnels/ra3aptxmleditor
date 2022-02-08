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

  var commonAtoms = ["regs", "flags", "reg0", "reg1", "reg2", "reg3", "reg4", "reg5", "reg6", "reg7", "reg8", "reg9", "reg10", "reg11", "reg12", "reg13", "reg14", "reg15", "reg16", "reg17", "reg18", "reg19"];
  var commonKeywords = ["end", "function"];
  var commonCommands = [
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
  "AcrionChr", 
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

  CodeMirror.registerHelper("hintWords", "aptscript", commonAtoms.concat(commonKeywords, commonCommands));

  define('atom', commonAtoms);
  define('keyword', commonKeywords);
  define('builtin', commonCommands);

  function tokenBase(stream, state) {
    if (stream.eatSpace()) return null;

    var sol = stream.sol();
    var ch = stream.next();

    if (ch === '\'' || ch === '"' || ch === '`') {
      state.tokens.unshift(tokenString(ch, ch === "`" ? "quote" : "string"));
      return tokenize(stream, state);
    }
    if (ch === ':' || ch === ',' || ch=== '|') {
      return 'operator';
    }
    if (ch === '(' || ch === ')') {
      return 'brace';
    }
    if (/\d/.test(ch)) {
      stream.eatWhile(/\d/);
      if(stream.eol() || !/\w/.test(stream.peek())) {
        return 'number';
      }
    }
    stream.eatWhile(/[\w-]/);
    var cur = stream.current();
    return words.hasOwnProperty(cur) ? words[cur] : null;
  }

  function tokenString(quote, style) {
    var close = quote == "(" ? ")" : quote == "{" ? "}" : quote
    return function(stream, state) {
      var next;
      while ((next = stream.next()) != null) {
        if (next === close) {
          state.tokens.shift();
          break;
        } else if (quote !== close && next === quote) {
          state.tokens.unshift(tokenString(quote, style))
          return tokenize(stream, state)
        } else if (/['"]/.test(next) && !/['"]/.test(quote)) {
          state.tokens.unshift(tokenStringStart(next, "string"));
          stream.backUp(1);
          break;
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
