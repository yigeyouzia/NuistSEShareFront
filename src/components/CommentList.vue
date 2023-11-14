<template>
    <div class="mt-5">
        <div>
            <div class="comment-list">
                <!-- 评论列表将通过 JavaScript 动态生成 -->
                <div class="text-center text-4 font-thin">
                    历史评论
                </div>
                <div class="grid grid-cols-24">
                    <!-- 加载中 -->
                    <div class="col-span-24 mt-5 mb-5 col-start-12" v-if="!loadFinish">
                        <div class="loading" style="font-size:xx-large" />
                        <h2>正在载入...</h2>
                    </div>
                    <div class="sm:col-span-24 xs:col-span-24 md:col-span-12 col-span-6" v-if="loadFinish"
                        v-for="comment in commentList.slice((currentPage - 1) * setting.comment.comment_amount_for_single_page, (currentPage - 1) * setting.comment.comment_amount_for_single_page + setting.comment.comment_amount_for_single_page)">
                        <div class="comment">
                            <a class="author mr-1" v-bind:href="parseUrl(comment.comment_link)" target="_blank">
                                {{ comment.comment_nickname }} </a>
                            <a class="font-1 text-3 linkandemail mr-1" v-bind:href="'mailto:' + comment.comment_email"
                                target="_blank" v-if="comment.comment_email != '' && setting.comment.show_email_address">
                                <el-icon>
                                    <Message />
                                </el-icon></a>
                            <a class="font-1 text-3 linkandemail" v-bind:href="parseUrl(comment.comment_link)"
                                target="_blank" v-if="comment.comment_link != '' && setting.comment.show_friend_link">
                                <el-icon>
                                    <Link />
                                </el-icon>
                            </a>

                            <div class="timestamp" v-if="setting.comment.show_time">
                                {{ comment.comment_datetime }}
                            </div>
                            <div class="comment-content font-thin text-sm">
                                {{ comment.comment_content }}
                            </div>
                        </div>
                    </div>
                </div>
                <!--评论懒加载-->
                <div class="pagination">
                    <button href="#" class="prev" :disabled="currentPage === 1 || !loadFinish"
                        @click="lastPage">前一页</button>
                    <span class="current-page">{{ currentPage }}/{{ fullPage }}</span>
                    <button href="#" class="next" :disabled="currentPage === fullPage || !loadFinish"
                        @click="nextPage">后一页</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { CommentData, CommentLengthData, CommentResponseData } from '@/types/Comments';
import { onMounted, ref } from 'vue';
import { GetCommentsLength, GetCommentsContent } from '@/api/CommentApi';
import setting from '@/setting';

//默认没有加载完成
const loadFinish = ref(false);

//当前页面
const currentPage = ref(1);

//全部页面
const fullPage = ref(0);
//后端写两个路由，获取当前页面的个数以及获取当前页面的评论内容

//每次加载6个评论，多余的就懒加载
const commentList = ref<CommentData[]>([]);

const pageAlreadyLoad = ref(0);

onMounted(() => {
    //加载评论长度
    GetCommentsLength().then((resp: CommentLengthData) => {
        fullPage.value = Math.ceil(resp["data"].comment_length / setting.comment.comment_amount_for_single_page);
    })
    //加载评论内容
    GetCommentsContent(currentPage.value).then((resp: CommentResponseData) => {
        commentList.value = [...commentList.value, ...resp["data"]];

    }).then(() => {
        //第一页已经加载
        pageAlreadyLoad.value = currentPage.value;
        loadFinish.value = true;
    });
})

//翻页函数
const lastPage = () => {
    if (currentPage.value === 1) {
        return;
    }
    currentPage.value--;
}

//下一页
const nextPage = () => {
    if (currentPage.value === fullPage.value) {
        return;
    }
    loadFinish.value = false;
    //检测是否需要加载新的
    if (pageAlreadyLoad.value <= currentPage.value) {
        //加载新的
        //加载评论内容
        GetCommentsContent(currentPage.value + 1).then((resp: CommentResponseData) => {
            commentList.value = [...commentList.value, ...resp["data"]];
        }).then(() => {
            loadFinish.value = true;
        }).then(() => {
            currentPage.value++;
            pageAlreadyLoad.value = currentPage.value;
        });
    } else {
        loadFinish.value = true;
        currentPage.value++;
    }
}

//处理url
const parseUrl = (url: string): string => {
    if (url.startsWith("http") || url.startsWith("https")) {
        return url;
    } else {
        return "http://" + url;
    }
}
</script>


<style lang="scss" scoped>
.comment-list {
    margin-top: 30px;
    max-width: 80%;
    margin: 0 auto;
    border-radius: 5px;
    @include background_color(themeBackgroundColor);
    @include font_color(themeFontColor);
    height: 100%;
    padding: 3px;
}


.comment {
    border: 2px;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
    padding: 10px;
    margin-bottom: 2px;
    border-radius: 5px;
    height: auto;
}

.comment .author {
    font-weight: bold;
    text-decoration: none;
    @include font_color(themeFontColor);
}

.comment .timestamp {
    font-size: 12px;
    margin-top: 5px;
    color: #888;
}

.comment .comment-content {
    margin-top: 5px;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    text-align: center;
}

.pagination button,
.pagination .current-page {
    display: inline-block;
    padding: 5px 10px;
    margin: 0 5px;
    border: 1px solid #ccc;
    text-decoration: none;
    color: #333;
    border: none;
    border-radius: 10px;
    @include font_color(themeFontColor);
    cursor: pointer;
}

.pagination .prev,
.pagination .next {
    flex: 0 0 auto;
    border-radius: 5px;
    border: none;
    background-color: #559857;
    @include font_color(themeFontColor);
}

.pagination .prev:hover,
.pagination .next:hover {
    background-color: #377b3a;
}

.pagination .prev:disabled,
.pagination .next:disabled {
    background-color: #377b3a;
    cursor: no-drop;
}

.linkandemail {
    @include font_color(themeFontColor);
}

.loading {
    position: relative;
    width: 48px;
    height: 48px;
    animation: satellite 3s infinite linear;
    border: 1px solid #000;
    border-radius: 100%;
}

.loading:before,
.loading:after {
    position: absolute;
    left: 1px;
    top: 1px;
    width: 12px;
    height: 12px;
    content: "";
    border-radius: 100%;
    background-color: #000;
    box-shadow: 0 0 10px #000;
}

.loading:after {
    right: 0;
    width: 20px;
    height: 20px;
    margin: 13px;
}

@keyframes satellite {
    from {
        transform: rotate(0) translateZ(0);
    }

    to {
        transform: rotate(360deg) translateZ(0);
    }
}
</style>


