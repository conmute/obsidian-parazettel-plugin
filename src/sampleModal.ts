import { App, Modal } from 'obsidian';
import { MyPlugin } from '@/src/plugin';

export class SampleModal extends Modal {
	plugin: MyPlugin;
	constructor(app: App, plugin: MyPlugin) {
		super(app);
        this.plugin = plugin;
	}

    onOpen() {
        const {contentEl} = this;
        contentEl.createEl('h2', {text: 'Note Title'});
		contentEl.addClass('pz-modal-container');

        const inputEl = contentEl.createEl('input', {type: 'text'});
        inputEl.addClass('pz-title-input');

        const checkboxContainer = contentEl.createDiv({ cls: 'pz-checkbox-container' });
        const checkboxEl = checkboxContainer.createEl('input', {type: 'checkbox'});
        checkboxEl.addClass('pz-folder-note-checkbox');
        checkboxContainer.createEl('label', {text: 'Create folder note'}).prepend(checkboxEl);

        const submitButton = contentEl.createEl('button', {text: 'Submit'});
		submitButton.addClass('pz-submit-button');
        const submitHandler = async () => {
            const title = inputEl.value;
            const createFolderNote = checkboxEl.checked;
            await this.plugin.createFileWithTitle(title, createFolderNote);
            this.close();
        };

        submitButton.addEventListener('click', submitHandler);
        inputEl.addEventListener('keypress', async (event) => {
            if (event.key === 'Enter') {
                await submitHandler();
            }
        });
    }

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}
