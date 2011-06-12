/*!
 * JS-Reflection
 * Copyright(c) 2010 Demetrius Johnson <contact@demetriusj.com>
 * MIT Licensed
 */

/**
 * 
 */

var exports = module.exports;

/**
 * Framework version
 */

exports.version = '0.0.1';

function parseMetaTags(metadata) {
  var tags = metadata.match(/\[@(.*?)\]/g)
    , restult = {};
  
  if(!tags) {
    return false;
  }
  
  for(var i in tags) {
    var str = tags[i]
      , len = str.indexOf('{')
      , tag = str.substring(str.indexOf('@') + 1, (len != -1 ? len : str.length - 1))
      , details = (len == -1 ? true : eval('(' + str.substring(len, str.length - 1) + ')'));
    restult[tag] = details;
  }
  
  return restult;
}

Function.prototype.reflect = exports.reflect = function(obj) {
  obj = obj || this;
  if(typeof obj === 'function') {
    // do not perform reflection twice 
    if(obj.args) {
      return false;
    }
    
    /*
     * Get the function and convert it to source and strip out the
     * new lines so parsing is easyer. Parse out the arguments and function
     * body.
     */
    var fnStr = obj.toString().replace(/[\n\t]/g,' ')
      , argStr = fnStr.match(/\(.+?\)/)
      , len = (argStr ? (argStr.index + argStr[0].length) : 11)
      , fnBodyStr = fnStr.substring(len)
      , metaData = {func:[], args:{}};

    /*
     * Split the arguments into an array and parse each one separately
     * so we can get the metadata tags for each argument.
     * 
     * 1. regex breaks the arguments up
     * 2. regex slipt up the metadata and arg name into an array
     * 3. have parseMetaTags read the metadata and return metadata in a non string format.
     */
    if(argStr) {
      argStr = fnStr.substring(argStr.index + 1, len - 1);
      var argList = argStr.match(/(([$\s\w]+)?(\/\*.+?\*\/)?([$\s\w]+)?)+/g);

      for(var i in argList) {
        if(argList[i] != '') {
          var meta = argList[i].match(/(\/\*.+?\*\/)|([a-zA-Z_$][0-9a-zA-Z_$]*)/g);
          var key = false
            , val = [];
            
          for(var j in meta) {
            if(meta[j][0] == '/') {
              var details = parseMetaTags(meta[j]);
              if(details) {
                val.push(details);
              }
            }
            else key = meta[j];
          }
          metaData.args[key] = val;
        }
      }
    }

    /*
     * Parse the function body for an meta data and have parseMetaTags read the metadata
     * and return metadata in a non string format.
     */    
    if(fnBodyStr) {
      var bodyList = fnBodyStr.match(/(\/\*.+?\*\/)/g);
      for(var i in bodyList) {
        if(bodyList[i] != '') {
          var details = parseMetaTags(bodyList[i]);
          if(details) {
            metaData.func.push(details);
          }
        }
      }
    }
    
    /*
     * Now save the parse metadata onto the reflection function.
     */
    obj.args = metaData.args;
    obj.func = metaData.func;
    
    return true;
    
  } else if(typeof obj === 'object') {
    for(var i in obj) {
      exports.reflect(obj[i]);
    }
    
    return true;
  }
  
  return false;
}
