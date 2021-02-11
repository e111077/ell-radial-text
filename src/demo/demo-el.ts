import { css, customElement, html, internalProperty, LitElement } from 'lit-element';
import '../ell-radial-text';
import { CenterDirection } from '../ell-radial-text';

@customElement('demo-el')
export class DemoEl extends LitElement {
  static styles = css`
    :host {
      --primary: 	hsl(4, 77%, 61%);
      --primary-light: 	hsl(6, 73%, 68%);
      --on-primary: hsl(0, 0%, 100%);
      --surface: hsl(35, 50%, 75%);
      --surface-light: hsl(47, 25%, 89%);
      --on-surface:	hsl(45, 2%, 35%);

      display: block;
      min-height: 100vh;
      background-color: var(--surface-light);
      padding: 16px;
      font-family: Arial, Helvetica, sans-serif;
      color: var(--on-surface);
    }

   #text-wrapper {
      color: var(--on-surface);
      font-size: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    input {
      border: none;
      background-color:var(--primary-light);
      padding: 4px;
      border-radius: 4px;
      color: var(--on-primary);
    }

    input:not([type=checkbox]) {
      outline: none;
    }

    input:hover:not([type=checkbox]), input:focus:not([type=checkbox]) {
      background-color: var(--primary);
    }

    #knobs {
      display: inline-flex;
      flex-direction: column;
      align-items: flex-end;
      position: absolute;
      right: 16px;
      padding: 8px;
      background-color: var(--surface);
      border-radius: 8px;
    }

    #knobs > * {
      margin-top: 8px;
    }
  `;

  @internalProperty() private text = 'Hello World';
  @internalProperty() private radius = 150;
  @internalProperty() private step = 8;
  @internalProperty() private start = 0;
  @internalProperty() private autoStep = false;
  @internalProperty() private centerDirection: CenterDirection = 'AUTO';

  render() {
    return html`
      <div id="knobs">
        <div>
          <label>
            text:
            <input @input=${this.textOnInput} value="Hello World">
          </label>
        </div>
        <div>
          <label>
            radius (px):
            <input type="number" pattern="[0-9]*" value="150" @input=${this.radiusOnInput}>
          </label>
        </div>
        <div>
          <label>
            step (deg):
            <input type="number" pattern="[0-9]*" value="8" @input=${this.stepOnInput}>
          </label>
        </div>
        <div>
          <label>
            start (deg):
            <input type="number" pattern="[0-9]*" value="0" @input=${this.startOnInput}>
          </label>
        </div>
        <div>
          <label>
            auto-step:
            <input type="checkbox" @change=${this.autoStepOnChange}>
          </label>
        </div>
        <div>
          <label>
            center-direction:
            <select @change=${this.centerDirectionOnChange}>
              <option value="AUTO" selected>AUTO</option>
              <option value="UP">UP</option>
              <option value="DOWN">DOWN</option>
              <option value="LEFT">LEFT</option>
              <option value="RIGHT">RIGHT</option>
            </select>
          </label>
        </div>
      </div>
      <div id="text-wrapper">
        <ell-radial-text
          .text=${this.text}
          .radius=${this.radius}
          .step=${this.step}
          .start=${this.start}
          .autoStep=${this.autoStep}
          .centerDirection=${this.centerDirection}>
        </ell-radial-text>
      </div>
    `;
  }

  private textOnInput(e: Event) {
    this.text = (e.target as HTMLInputElement).value;
  }

  private radiusOnInput(e: Event) {
    const radiusStr = (e.target as HTMLInputElement).value;
    if (!radiusStr.length) {
      this.radius = 0;
    }

    this.radius = Number(radiusStr);
  }

  private stepOnInput(e: Event) {
    const stepStr = (e.target as HTMLInputElement).value;
    if (!stepStr.length) {
      this.step = 0;
    }

    this.step = Number(stepStr);
  }

  private startOnInput(e: Event) {
    const startStr = (e.target as HTMLInputElement).value;
    if (!startStr.length) {
      this.start = 0;
    }

    this.start = Number(startStr);
  }

  private autoStepOnChange(e: Event) {
    this.autoStep = (e.target as HTMLInputElement).checked;
  }

  private centerDirectionOnChange(e: Event) {
    this.centerDirection = (e.target as HTMLSelectElement).value as CenterDirection;
  }
}