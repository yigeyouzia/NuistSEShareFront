<template>
  <div>
    <div class="mirrorside-button">
      <button>search</button>
    </div>
  </div>
</template>
      
<style scoped lang="scss">
.mirrorside-button {

  button {
    width: $dynamicButtonsWidth;
    height: $dynamicButtonsHeight;
    font-size: 20px;
    background-color: transparent;
    color: $buttonColor;
    border: 2px solid $buttonColor;
    border-radius:5px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    text-align: center;

    &::after {
      content: "";
      display: block;
      background-color: #ffffff50;
      position: absolute;
      width: 20px;
      height: 80px;
      top: -20px;
      left: -50px;
      transform: rotate(-45deg);
    }

    &:hover {
      &::after {
        left: 120%;
        transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
        -webkit-transition: all 800ms cubic-bezier(0.3, 1, 0.2, 1);
      }
    }

    &:active {
      color: $buttonColor2;
      border: 3px solid $buttonColor2;
    }
  }
}
</style>