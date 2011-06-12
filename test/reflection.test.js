var refl = require('../lib/reflection')
  , assert = require('assert')
  , fixture = require('./fixture/meta-code');

module.exports = {
  'Reflect parse': function() {
    for(var i in fixture) {
      if(typeof(fixture[i]) == 'function') {
        assert.equal(fixture[i].reflect(), true, 'func:'+i);
      }
    }
    
    assert.equal(refl.reflect(fixture.nested), true);
  },
  'Reflect again':function() {
    assert.equal(fixture.inlineFuncMixedArgsAll.reflect(), false);
  },

  'inlineFuncMixedArgsAll':function() {
    assert.eql(fixture.inlineFuncMixedArgsAll('a','b'), 'ab');
    assert.eql(fixture.inlineFuncMixedArgsAll.args, { '$ar_g1': [ { isNumber: {min:1, max:100}, notNull: true } ], arg2: [] });
    assert.eql(fixture.inlineFuncMixedArgsAll.func,[
      { DOC: { author: 'Demetrius Johnson', site: 'http://demetriusj.com/api/docs.html' } },
      { private: true },
      { DOC: { notes: 'This function is for testinging', refnum: 123 } }
      ]
    );
  },
  'inlineFuncMixedArgs':function() {
    assert.eql(fixture.inlineFuncMixedArgs.args, { arg1: [ { isNumber: true } ], arg2: [] });
    assert.eql(fixture.inlineFuncMixedArgs.func, [ { DOC: true } ]);
    assert.eql(fixture.inlineFuncMixedArgs('a','b'), 'b');
  },
  'inlineFuncMixedArgsMultiMeta':function() {
    assert.eql(fixture.inlineFuncMixedArgsMultiMeta.args, { arg1: [ { private: true }, { isNumber: true } ], arg2: [] });
    assert.eql(fixture.inlineFuncMixedArgsMultiMeta.func, [ { DOC: true } ]);
    assert.eql(fixture.inlineFuncMixedArgs('a','b'), 'b');
  },
  'inlineFuncMixedArgsMultiMetaMultiLines':function() {
    assert.eql(fixture.inlineFuncMixedArgsMultiMetaMultiLines.args, { wow: [ { demi: true } ], arg1: [ { private2: true }, { isNumber2: true } ], arg2: [] });
    assert.eql(fixture.inlineFuncMixedArgsMultiMetaMultiLines.func, []);
    assert.eql(fixture.inlineFuncMixedArgsMultiMetaMultiLines('a','b','c'), 'abc');
  },
  'inlineFuncArg':function() {
    assert.eql(fixture.inlineFuncArg.args, { arg1: [ { isNumber: true } ] });
    assert.eql(fixture.inlineFuncArg.func, [ { DOC: true } ]);
  },
  'inlineFuncArgs':function() {
    assert.eql(fixture.inlineFuncArgs.args, { arg1: [ { isNumber: true } ], arg2: [] });
    assert.eql(fixture.inlineFuncArgs.func, [ { DOC: true } ]);
  },
  'inlineFunc':function() {
    assert.eql(fixture.inlineFunc.args, { arg1: [], arg2: [] });
    assert.eql(fixture.inlineFunc.func, [ { DOC: true } ]);
  },
  'inlineEmpty':function() {
    assert.eql(fixture.inlineEmpty.args, {});
    assert.eql(fixture.inlineEmpty.func, []);
  },
  'inlineEmpty1':function() {
    assert.eql(fixture.inlineEmpty1.args, { arg1: [] });
    assert.eql(fixture.inlineEmpty1.func, []);
  },
  'inlineEmpty2':function() {
    assert.eql(fixture.inlineEmpty2.args, { arg1: [], arg2: [] });
    assert.eql(fixture.inlineEmpty2.func, []);
  },

  'inlineMultilineFuncMixedArgs':function() {
    assert.eql(fixture.inlineMultilineFuncMixedArgs.args, { '$arg1': [ { isNumber: true } ], arg2: [] });
    assert.eql(fixture.inlineMultilineFuncMixedArgs.func, [ { DOC: true } ]);
  },

  'Nested Functions':function() {
    assert.eql(fixture.nested.nestedInlineFn.args, { arg1: [{nested:true}] });
    assert.eql(fixture.nested.nestedInlineFn.func, []);
    assert.eql(fixture.nested.nestedDeep.nestedInlineFn.args, { arg1: [{nestedDeep:true}] });
    assert.eql(fixture.nested.nestedDeep.nestedInlineFn.func, []);
  }
}