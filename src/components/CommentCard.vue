<template>
  <div class="comment-card">
    <div class="comment-form">
      <div class="text-center text-4 font-thin">
        亲，真的不在此美言几句嘛i(●ˇ∀ˇ●)？
      </div>
      <form id="commentForm">
        <div class="form-group">
          <div class="grid grid-cols-24">
            <div class="md:col-span-8 p-1 sm:col-span-24 mr-0 xs:col-span-24 mr-0">
              <input type="text" id="nickname" v-model="nickName" placeholder="昵称" required>
            </div>
            <div class="md:col-span-8 p-1 sm:col-span-24 mr-0 xs:col-span-24 mr-0">
              <input type="email" id="friendemail" v-model="friendEmail" placeholder="邮箱" required>
            </div>
            <div class="md:col-span-8 p-1 sm:col-span-24 mr-0 xs:col-span-24 mr-0">
              <input type="url" id="friendlink" v-model="friendLink" placeholder="友情链接（可选）">
            </div>
          </div>
        </div>
        <div class="form-group p-1">
          <textarea type="text" id="comment-content" class="w-full comment-content" v-model="commentContent"
            placeholder="在这里输入你的评论内容..." required />
        </div>
      </form>
      <div class="form-group p-1">
        <button v-on:click="submitComment" class="submit">提交评论</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CommentData } from '@/types/Comments';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const isNickname = (nickname: string): boolean => {
  if (nickname != "") {
    return true;
  } else {
    return false;
  }
}

const isValidEmail = (email: string): boolean => {
  // 正则表达式模式，用于匹配电子邮件地址
  var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 使用正则表达式测试邮箱地址
  return emailPattern.test(email);
}

const isValidURL = (url: string): boolean => {
  if (url === "") {
    return true;
  }
  // 正则表达式模式，用于匹配URL
  var urlPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // 使用正则表达式测试URL
  return urlPattern.test(url);
}

const isCommentContent = (content: string): boolean => {
  if (content === "") {
    return false;
  } else {
    return true;
  }
}

const constructComment = (nickName: string, friendEmail: string, friendLink: string, commentContent: string): CommentData => {
  let commentData: CommentData = {
    comment_nickname: nickName,
    comment_email: friendEmail,
    comment_link: friendLink,
    comment_content: commentContent,
    comment_id: 0,
    comment_datetime: "",
  };
  return commentData;
}

const nickName = ref("");
const friendEmail = ref("");
const friendLink = ref("");
const commentContent = ref("");

const submitComment = () => {
  let isValid = true;

  if (!isNickname(nickName.value)) {
    ElMessage({
      message: '请检查昵称格式！',
      type: 'warning',
    })
    isValid = false;
  }

  if (!isValidEmail(friendEmail.value) && isValid === true) {
    ElMessage({
      message: '请检查邮箱格式！',
      type: 'warning',
    })
    isValid = false;
  }

  if (!isValidURL(friendLink.value) && isValid === true) {
    ElMessage({
      message: '请检查网址格式！',
      type: 'warning',
    })
    isValid = false;
  }

  if (!isCommentContent(commentContent.value) && isValid === true) {
    ElMessage({
      message: '请检查评论内容！',
      type: 'warning',
    })
    isValid = false;
  }

  //检查可用性
  if (isValid) {
    console.log(nickName.value, friendEmail.value, friendLink.value, commentContent.value);
    ElMessage({
      message: '评论发送成功！',
      type: 'success',
    })
    constructComment(nickName.value, friendEmail.value, friendLink.value, commentContent.value);
  } else {
    return;
  }
}


</script>

<style lang="scss" scoped>
/* 样式美化 */
body {
  font-family: Arial, sans-serif;
  background-color: #f2f2f2;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
}

.comment-form {
  max-width: 80%;
  margin: 0 auto;
  background-color: #fff;
  padding: 3px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  @include background_color(themeBackgroundColor);
  @include font_color(themeFontColor);

}

.form-group {
  margin-bottom: 2px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="url"] {
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  height: 25px;
  @include background_color(themeBackgroundColor);
  @include font_color(themeFontColor);
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.comment-content {
  resize: vertical;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-height: 150px;
  border: none;
  @include background_color(themeBackgroundColor);
  @include font_color(themeFontColor);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.submit {
  background-color: #559857;
  color: #fff;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  height: 30px;
  @include font_color(themeFontColor);
}

.submit:hover {
  background-color: #377b3a;
}


.font-style-cool {
  font-family: mashanzhengmaobikaishu sans-serif;
}
</style>

