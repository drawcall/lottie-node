var FontManager = (function () {
  var emptyChar = {
    w: 0,
    size: 0,
    shapes: [],
  };
  var combinedCharacters = [];
  //Hindi characters
  combinedCharacters = combinedCharacters.concat([
    2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379,
    2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403,
  ]);

  function addFonts(fontData) {}
  function addChars(chars) {
    if (!chars) {
      return;
    }
    if (!this.chars) {
      this.chars = [];
    }
    var i,
      len = chars.length;
    var j,
      jLen = this.chars.length,
      found;
    for (i = 0; i < len; i += 1) {
      j = 0;
      found = false;
      while (j < jLen) {
        if (this.chars[j].style === chars[i].style && this.chars[j].fFamily === chars[i].fFamily && this.chars[j].ch === chars[i].ch) {
          found = true;
        }
        j += 1;
      }
      if (!found) {
        this.chars.push(chars[i]);
        jLen += 1;
      }
    }
  }

  function getCharData(char, style, font) {
    var i = 0,
      len = this.chars.length;
    while (i < len) {
      if (this.chars[i].ch === char && this.chars[i].style === style && this.chars[i].fFamily === font) {
        return this.chars[i];
      }
      i += 1;
    }
    if (((typeof char === 'string' && char.charCodeAt(0) !== 13) || !char) && console && console.warn) {
      console.warn('Missing character from exported characters list: ', char, style, font);
    }
    return emptyChar;
  }

  function measureText(char, fontName, size) {
    var fontData = this.getFontByName(fontName);
    var index = char.charCodeAt(0);
    if (!fontData.cache[index + 1]) {
      var tHelper = fontData.helper;

      if (char === ' ') {
        tHelper.textContent = '|' + char + '|';
        var doubleSize = tHelper.getComputedTextLength();
        tHelper.textContent = '||';
        var singleSize = tHelper.getComputedTextLength();
        fontData.cache[index + 1] = (doubleSize - singleSize) / 100;
      } else {
        tHelper.textContent = char;
        fontData.cache[index + 1] = tHelper.getComputedTextLength() / 100;
      }
    }
    return fontData.cache[index + 1] * size;
  }

  function getFontByName(name) {
    var i = 0,
      len = this.fonts.length;
    while (i < len) {
      if (this.fonts[i].fName === name) {
        return this.fonts[i];
      }
      i += 1;
    }
    return this.fonts[0];
  }

  function getCombinedCharacterCodes() {
    return combinedCharacters;
  }

  function loaded() {
    return this.isLoaded;
  }

  var Font = function () {
    this.fonts = [];
    this.chars = null;
    this.typekitLoaded = 0;
    this.isLoaded = true;
  };

  //TODO: for now I'm adding these methods to the Class and not the prototype. Think of a better way to implement it.
  Font.getCombinedCharacterCodes = getCombinedCharacterCodes;
  Font.prototype.addChars = addChars;
  Font.prototype.addFonts = addFonts;
  Font.prototype.getCharData = getCharData;
  Font.prototype.getFontByName = getFontByName;
  Font.prototype.measureText = measureText;
  Font.prototype.loaded = loaded;

  return Font;
})();
