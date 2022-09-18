<template>
  <section class="app">
    <div class="container">
      <h1 class="app_title">Классификация по Хомскому</h1>
      <div class="source_input">
        <div class="source_input_title">Введите правила для грамматики:</div>
        <div class="errors" v-if="errors">{{ this.errors }}</div>
        <form class="fieldsets">
          <fieldset class="fieldset">
            <legend class="legend">Левая часть</legend>
            <input class="input" v-model="leftRule" />
          </fieldset>
          <span class="symbol">
            <div class="img_wrapper">
              <img src="./assets/img/pngwing.com.png" />
            </div>
          </span>
          <fieldset class="fieldset">
            <legend class="legend">Правая часть</legend>
            <input class="input" v-model="rightRule" />
          </fieldset>
          <button class="btn" @click.prevent="addRule()">
            Добавить правило
          </button>
        </form>
      </div>
      <div class="rules" v-if="rules.length > 0">
        <div class="rules_title">Ваши правила:</div>
        <div class="rule" v-for="(rule, index) in rules" :key="index">
          <div class="rule_left">{{ index }}. {{ rule.left }}</div>
          <div class="img_wrapper">
            <img src="./assets/img/pngwing.com.png" />
          </div>
          <div class="rule_right">{{ rule.right }}</div>
          <div class="img_wrapper delete">
            <img
              src="./assets/img/free-icon-remove-1828843.png"
              @click="deleteRule(rule)"
            />
          </div>
        </div>
        <button class="btn selection" @click="getSelection()">
          Узнать грамматику
        </button>
        <div class="grammatic" v-if="grammarType">
          <div class="grammatic_title">Грамматика принадлжеит к:</div>
          <div class="grammatic_description">{{ grammarType }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Selection } from "@/model/selection";

export default {
  name: "App",
  data() {
    return {
      rules: [],
      leftRule: "",
      rightRule: "",
      errors: "",
      storageName: "rules-set",
      grammarType: "",
    };
  },
  created() {
    const storageData = localStorage.getItem(this.storageName);

    if (storageData !== null) {
      this.rules = JSON.parse(storageData);
    }
  },
  methods: {
    addRule() {
      if (this.leftRule === "" || this.rightRule === "") {
        this.errors = "Заполните оба поля";
        return;
      }

      const currentRule = {
        left: this.leftRule,
        right: this.rightRule,
      };

      this.rules = [...this.rules, currentRule];

      this.leftRule = "";
      this.rightRule = "";
    },
    deleteRule(rule) {
      this.rules = this.rules.filter((item) => item !== rule);
    },
    getSelection() {
      const selection = new Selection(this.rules);
      this.grammarType = selection.getGrammar();
    },
  },
  watch: {
    rules() {
      localStorage.setItem(this.storageName, JSON.stringify(this.rules));
      this.grammarType = "";
    },
  },
};
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 960px;
  padding: 0 15px;
  margin: 0 auto;
}

.app_title {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 2rem;
  text-align: center;
}

.source_input {
  margin-top: 5rem;
}

.source_input_title {
  font-size: 1.2rem;
  font-weight: 600;
}

.fieldsets {
  margin-top: 1rem;
  display: flex;
  align-items: center;
}

.fieldset:first-child {
  margin-right: 1rem;
}

.fieldset:not(:first-child) {
  margin-left: 1rem;
}

.img_wrapper {
  max-width: 2rem;
}

.img_wrapper img {
  width: 100%;
  height: auto;
}

.errors {
  color: red;
  font-size: 1rem;
  padding: 0.2rem 0;
}

.fieldset {
  padding: 0.8rem 0.2rem 0.2rem 0.8rem;
  width: 15%;
}

.legend {
  font-size: 1.2rem;
  font-weight: 300;
}

.input {
  padding: 0.5rem 0.6rem;
  font-size: 1.2rem;
  width: 90%;
}

.btn {
  margin-left: 2rem;
  padding: 0.6rem;
  background-color: transparent;
  font-size: 1rem;
  color: #000;
  transition: 0.3s ease-in-out;
}

.btn:hover {
  background-color: #000;
  color: #fff;
}

.rules {
  margin-top: 2rem;
}

.rule div {
  width: 20%;
}

.rules_title {
  font-size: 1.35rem;
  margin-bottom: 1rem;
}

.rule {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding-left: 1rem;
  width: 25rem;
  justify-content: space-between;
}

.delete {
  max-width: 1.2rem;
  transition: 0.3s ease-in-out;
}

.delete:hover {
  filter: invert(1);
}

.selection {
  margin: 2rem 0rem;
}

.grammatic_title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
}

.grammatic_description {
  margin-top: 1rem;
  font-size: 1rem;
}
</style>
