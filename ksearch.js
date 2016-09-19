import _ from 'underscore'

 export default class search {
	constructor() {
		this.KOREAN_BEGIN_UNICODE = 44032; //First character of Korean
		this.KOREAN_LAST_UNICODE = 55203; //Last character of Korean
		this.KOREAN_BASE_UNIT = 588; // # of characters that each consonant gets
		this.CONSONANTS = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
            'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	}
	//CHECK if the input is consonant
	isConsonant(c) {
		console.log(c)
		return _.contains(this.CONSONANTS, c);
	}

	//CHECK if the input is in Korean
    isKorean(c) {
    	console.log(c.charCodeAt(0))
        return this.KOREAN_BEGIN_UNICODE <= c.charCodeAt(0) && c.charCodeAt(0) <= this.KOREAN_LAST_UNICODE;
    }

    //GET consonants
    getConsonant(c) {
        let koreanBegin = (c.charCodeAt(0) - this.KOREAN_BEGIN_UNICODE);
        let index = koreanBegin / this.KOREAN_BASE_UNIT;
        return this.CONSONANTS[index | 0];
    }

    //CHECK if the first character of the string value matches with the consonant.
    matchSpecificStringInKorean(value, search) {
        if (this.isConsonant(search.charAt(0)) && this.isKorean(value.charAt(0))) {
        	console.log('hey')
            if (this.getConsonant(value.charAt(0)) == search.charAt(0)) {
                return true;
            }
        } else {
        	return false;
    	}
    }

    //CHECK if the string value matches with the consonants.
    matchAllStringInKorean(value, search) {
        let t;
        let seof = value.length - search.length;
        let slen = search.length;

        if (seof < 0) {
            return false; //If the length of search value is greater than that of value, return false!
        }

        for (let i = 0; i <= seof; i++) {
            t = 0;
            while (t < slen) {
                if (this.isConsonant(search.charAt(t)) && this.isKorean(value.charAt(i + t))) {
                    if (this.getConsonant(value.charAt(i + t)) == search.charAt(t)) {
                        t++;
                    } else {
                        break;
                    }
                } else {
                    if (value.charAt(i + t) == search.charAt(t)) {
                        t++;
                    } else {
                        break;
                    }
                }
            }
            if (t == slen) {
                return true;
            }
        }
        return false;
    }

    //Check if the string value is not in Korean.
    isStringEnglish(value) {
        return !this.isKorean(value.charAt(0));
    }

}