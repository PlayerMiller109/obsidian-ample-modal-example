module.exports = (app, ob)=> new class {
  suggester = async (display, items, value = '')=> await new class extends ob.FuzzySuggestModal {
    constructor(app) {
      super(app); this.promise = new Promise(r=> this.r = r)
      this.open(); Object.assign(this.inputEl, {value})
    }
    getItemText = (item)=> Array.isArray(display) ? display[items.indexOf(item)] : display(item)
    getItems = ()=> items
    onChooseItem = (item, evt)=> this.r(item)
  }(app).promise

  rgx_form_modal = async (su)=> await new class extends ob.Modal {
    constructor(app) {
      super(app); this.Setting = ob.Setting
      this.promise = new Promise(r=> this.r = r)
      this.modalEl.addClass('ample'); this.open()
    }
    get base() { return new this.Setting(this.contentEl).setClass('full-line-input') }
    onOpen() {
      this.base
        .setName('Rgx').addText(inpu=> inpu.setValue(su.rgx).onChange(value=> su.rgx = value))
        .addButton(btn=> btn.setButtonText('Submit').onClick(()=> { this.close(); this.r() }))
      this.base.setName('Form').addText(inpu=> inpu.setValue(su.f).onChange(value=> su.f = value))
    }
    onClose() { this.contentEl.empty() }
  }(app).promise

  inputPrompt = async (header, placeholder = '', value = '')=> await new class extends ob.Modal {
    constructor(app) {
      super(app); this.Setting = ob.Setting
      this.promise = new Promise((resolve, reject)=> (this.ok = resolve, this.fail = reject)).catch(e=> e)
      this.modalEl.addClass('ample'); this.open()
    }
    onOpen() {
      this.setTitle(header)
      const area = this.contentEl.createEl('textarea', { cls: 'full-line-input' })
      Object.assign(area, {
        placeholder, value, style: 'height: 30px;',
        oninput: ()=> { area.style.height = '32px'; area.style.height = `${area.scrollHeight}px` },
        onkeydown: evt=> {
          if (evt.key != 'Enter' || evt.shiftKey || evt.ctrlKey) return; evt.preventDefault()
          this.close(); this.ok(area.value)
        }
      }); area.focus(); area.select()
      new this.Setting(this.contentEl)
        .addButton(btn=> btn.setButtonText('Cancel').onClick(()=> { this.close(); this.fail() }))
        .addButton(btn=> btn.setClass('ok-btn').setButtonText('Ok').onClick(()=> { this.close(); this.ok(area.value) }))
    }
    onClose() { this.contentEl.empty() }
  }(app).promise

  yesNoPrompt = async (header, detail)=> await new class extends ob.Modal {
    constructor(app) {
      super(app); this.Setting = ob.Setting
      this.promise = new Promise((resolve, reject)=> (this.ok = resolve, this.fail = reject)).catch(e=> e)
      this.modalEl.addClass('ample'); this.open()
    }
    onOpen() {
      this.setTitle(header); this.contentEl.createEl('div', { text: detail })
      new this.Setting(this.contentEl)
        .addButton(btn=> btn.setButtonText('No').onClick(()=> { this.close(); this.fail(!1) }))
        .addButton(btn=> btn.setWarning().setButtonText('Yes').onClick(()=> { this.close(); this.ok(!0) }))
    }
    onClose() { this.contentEl.empty() }
  }(app).promise

  checkboxPrompt = async (items, chosenItems)=> await new class extends ob.Modal {
    constructor(app) {
      super(app); this.Setting = ob.Setting
      this.promise = new Promise(r=> this.r = r)
      this.modalEl.addClass('ample'); this.open()
    }
    onOpen() {
      items.map(item=> new this.Setting(this.contentEl)
        .setClass('toggle-box').setName(item)
        .addToggle(box=> box
          .setValue(chosenItems.includes(item))
          .onChange(flag=>
            flag ? chosenItems.push(item) : chosenItems.splice(chosenItems.findIndex(chosen=> chosen == item), 1)
          )
        )
      )
      new this.Setting(this.contentEl).addButton(btn=> btn
        .setButtonText('Submit').onClick(()=> { this.close(); this.r(chosenItems) })
      )
    }
    onClose() { this.contentEl.empty() }
  }(app).promise
}