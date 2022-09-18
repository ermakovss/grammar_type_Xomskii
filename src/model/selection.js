export class Selection {
  #rules = [];

  constructor(rules) {
    this.#rules = rules;
  }

  #getLength(str) {
    return str.length;
  }

  #getSideRules(key) {
    const sideRules = this.#rules.reduce((array, rule) => {
      array.push(rule[key]);
      return array;
    }, []);

    return sideRules;
  }

  #isUppersCase(symbol) {
    return symbol === symbol.toUpperCase();
  }

  #getLengthToUpperChars(rules) {
    let length = [];
    rules.map((rule) => {
      length.push(
        rule.split("").reduce((count, symbol) => {
          return this.#isUppersCase(symbol) ? (count += 1) : count;
        }, 0)
      );
    });

    return length;
  }

  #getLengthToLowerChars(rules) {
    let length = [];
    rules.map((rule) => {
      length.push(
        rule.split("").reduce((count, symbol) => {
          return this.#isUppersCase(symbol) ? count : (count += 1);
        }, 0)
      );
    });

    return length;
  }

  #isOnlyOneUpperChars(upperCount) {
    const count = upperCount.reduce((count, item) => {
      if (item === 1) {
        return (count += 1);
      } else {
        return count;
      }
    }, 0);

    return count === upperCount.length;
  }

  #hasIncludeUpperChars(counts) {
    const include = counts.find((item) => {
      (item === counts) === 1;
    });

    return include === null;
  }

  #isRequiredTypeThreeAndTwo(leftUpperCount, leftLowerCount) {
    if (
      this.#isOnlyOneUpperChars(leftUpperCount) &&
      !this.#hasIncludeUpperChars(leftLowerCount)
    ) {
      return true;
    }

    return false;
  }

  #positionToUpperSymbols(rightRule) {
    const position = [];

    rightRule.map((rule) => {
      rule.split("").map((item, index) => {
        if (this.#isUppersCase(item)) {
          if (index === 0) {
            position.push("start");
          } else if (index === rule.length - 1) {
            position.push("end");
          } else {
            position.push("middle");
          }
        }
      });
    });

    return position;
  }

  #isRequiredForTypeThreeRight(rightPositionUpper, position) {
    const required = rightPositionUpper.reduce((count, item) => {
      return item === position ? (count += 1) : count;
    }, 0);

    return required === rightPositionUpper.length;
  }

  #isRequiredForTypeOne(leftRule, rightRule) {
    const requiredForRule = [];
    for (let i = 0; i < leftRule.length; i++) {
      requiredForRule.push(leftRule[i].length <= rightRule[i].length);
    }

    const required = requiredForRule.reduce((count, item) => {
      return item === true ? (count += 1) : count;
    });

    return required === leftRule.length;
  }

  getGrammar() {
    const leftRule = this.#getSideRules("left");
    const rightRule = this.#getSideRules("right");

    const leftUpperCounts = this.#getLengthToUpperChars(leftRule);

    const leftLowerCounts = this.#getLengthToLowerChars(leftRule);

    const rightPositionUpper = this.#positionToUpperSymbols(rightRule);

    if (this.#isRequiredTypeThreeAndTwo(leftUpperCounts, leftLowerCounts)) {
      if (this.#isRequiredForTypeThreeRight(rightPositionUpper, "end")) {
        return "Тип грамматики по классификации Хомского принадлежит к типу под номером 3 (правосторонний)";
      } else if (
        this.#isRequiredForTypeThreeRight(rightPositionUpper, "start")
      ) {
        return "Тип грамматики по классификации Хомского принадлежит к типу под номером 3 (левосторонний)";
      } else {
        return "Тип грамматики по классификации Хомского принадлежит к типу под номером 2 (нетерминал посередине)";
      }
    } else if (this.#isRequiredForTypeOne(leftRule, rightRule)) {
      return "Тип грамматики по классификации Хомского принадлежит к типу под номером 1 (левая часть <= правой)";
    } else {
      return "Тип грамматики по классификации Хомского принадлежит к типу под номером 0 (нет ограничений)";
    }
  }
}
