发布于 [Obsidian 中文论坛 t34933](https://forum-zh.obsidian.md/t/topic/34933/1)，里面有一些前置的说明。

作者本人不是计算机专业的，一定要充分测试之后再使用，更好更安全的方式是参考示例自己写。

每个 modal 都有一些套路部分，如图红框所示，剩下部分就和定义一个普通函数没区别了，如图绿框所示，整个 modal 可看作一个异步函数 `rgx_form_modal = async (su)=>`。这样，就很好理解在其他文件引用时应该如何书写。

<image width="700" src="https://github.com/PlayerMiller109/obsidian-ample-modal-example/assets/145541890/56dfd86d-85f0-4643-a543-05e9900d8227">

例如，图示的 modal 只有 resolve，且 `this.close()` 后的 `this.r()` 中间没有参数，所以没有返回值，在其他文件使用时，格式就是：

```js
// Suppose you have introduced the modals.js in your plugin and name it "mySimpleApi"
const su = { rgx: '', f: '' }
// other possible expressions...
await this.mySimpleApi.rgx_form_modal(su)
// if no resolve, function stops here.
// other possible expressions...
```