const ob = require('obsidian')
module.exports = class extends ob.Plugin {
  mySimpleApi = require(`${app.vault.adapter.basePath}/${app.plugins.manifests['ample-modals'].dir}/src/modals.js`)(app, ob)
  // 假设 JS 路径如上, 希望的 Api 名为 mySimpleApi
  onload() {
    // 这里注册命令以展示 modals
    this.addCommand({
      id: 'test-suggester', name: 'Test suggester',
      callback: async ()=> {
        const r1 = await this.mySimpleApi.suggester(['你能看到的'], ['你能得到的'], '预填值, 可不填')
        if (!r1) return; console.log(r1)
        const r2 = await this.mySimpleApi.suggester(p=> '选项'+p, [1, 2]); if (!r2) return
        console.log(r2)
      }
    })
    this.addCommand({
      id: 'test-rgx_form_modal', name: 'Test rgx_form_modal',
      callback: async ()=> {
        const su = { rgx: '/(.*?_)(\\d{4})(\\d{2})(\\d{2})/', f: '`$1$2-$3-$4`' }
        await this.mySimpleApi.rgx_form_modal(su)
        console.log(su)
      }
    })
    this.addCommand({
      id: 'test-inputPrompt', name: 'Test inputPrompt',
      callback: async ()=> {
        const r = await this.mySimpleApi.inputPrompt('我是标题: 请输入', '我是占位符, 可不填', '我是预填值, 可不填')
        if (!r) return; console.log(r)
      }
    })
    this.addCommand({
      id: 'test-yesNoPrompt', name: 'Test yesNoPrompt',
      callback: async ()=> {
        await this.mySimpleApi.yesNoPrompt('我是标题: 你好吗', '我是描述, 可不填')
        ? console.log('你好呀') : console.log('还没好')
      }
    })
    this.addCommand({
      id: 'test-checkboxPrompt', name: 'Test checkboxPrompt',
      callback: async ()=> {
        const items = ['选项1', '选项2', '选项3']
        const chosenItems = await this.mySimpleApi.checkboxPrompt(items, ['选项1', '选项2'])
        // 第 2 个参数为预勾选选项, 可不填
        console.log(chosenItems)
      }
    })
  }
  onunload() {}
}