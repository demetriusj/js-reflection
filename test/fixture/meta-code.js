/*
 * 
 */

module.exports = {
  inlineFuncMixedArgsAll: function($ar_g1 /* [@isNumber{min:1,max:100}] 
    [@notNull]*/, arg2) {
    /* [@DOC{author:'Demetrius Johnson', site:'http://demetriusj.com/api/docs.html'}]
     */
    /* [@private] */
    /* [@DOC{
          notes:'This function is for testinging',
          refnum:123}]
     */
    
    /* This is just a node and should not be parsed */
   return $ar_g1 + arg2;
  },
  inlineFuncMixedArgs: function(arg1 /* [@isNumber] */, arg2) {
    /* [@DOC] */
   return arg2
  },
  inlineFuncMixedArgsMultiMeta: function(/* [@private] */arg1 /* [@isNumber] */, arg2) {
    /* [@DOC] */
   return arg2;
  },
  inlineFuncMixedArgsMultiMetaMultiLines: function(/* [@demi] */ wow,
    /* [@private2] */
    arg1 
    /* [@isNumber2] */,
    arg2) {
    return wow+arg1+arg2;
  },
  inlineFuncArg: function(arg1 /* [@isNumber] */) {
    /* [@DOC] */
    return arg1;
  },
  inlineFuncArgs: function(arg1 /* [@isNumber] */, arg2) {
    /* [@DOC] */
  },
  inlineFunc: function(arg1, arg2) {
    /* [@DOC] */
  },
  inlineEmpty: function() {
    
  },
  inlineEmpty1: function(arg1) {
    
  },
  inlineEmpty2: function(arg1, arg2) {
    
  },

  inlineMultilineFuncMixedArgs: function(
    $arg1
    /* [@isNumber] */, 
    arg2) {
    /* [@DOC] */
  },
  
  nested: {
    nestedInlineFn: function(arg1 /*[@nested]*/) {
      return true;
    },
    type: "nested",
    value: 123,
    nestedDeep: {
      nestedInlineFn: function(arg1 /*[@nestedDeep]*/) {
        return true;
      },
    }
  },
  type: "foo",
  value: 123
}
