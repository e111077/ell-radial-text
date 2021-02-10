import { css, customElement, html, LitElement, property, PropertyValues } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

export type CenterDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'AUTO';

@customElement('ell-radial-text')
export class EllRadialText extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      font-family: var(--ell-font-family, monospace);
    }

    #wrapper {
      display: inline-flex;
      position: relative;
    }

    #wrapper > * {
      transform-origin: bottom center;
      position: absolute;
      inset: 0 auto auto 0;
    }
  `;

  @property({ type: String, reflect: true })
  text = '';

  @property({ type: Number, reflect: true })
  radius = 0;

  @property({ type: Number, reflect: true })
  step = 0;

  @property({ type: Number, reflect: true })
  start = 0;

  @property({ type: Boolean, reflect: true, attribute: 'auto-step' })
  autoStep = false;

  @property({ type: String, reflect: true, attribute: 'center-direction' })
  centerDirection: CenterDirection = 'AUTO';

  private textParts: string[] = [];

  update(changed: PropertyValues) {
    if (changed.has('text')) {
      this.textParts = this.text.split('');
    }

    super.update(changed);
  }

  render() {
    let step = this.step;

    if (this.autoStep && this.text.length) {
      step = 360 / this.text.length;
    } else if (this.autoStep && !this.text.length) {
      step = 0;
    }

    let start = this.start;
    const upDegrees = -(this.text.length - 1) * step / 2;
    switch (this.centerDirection) {
      case 'UP':
        start = upDegrees;
        break;
      case 'RIGHT':
        start = upDegrees + 90;
        break;
      case 'DOWN':
        start = upDegrees + 180;
        break;
      case 'LEFT':
        start = upDegrees + 270;
        break;
    };

    const textPartTemplates = this.textParts.map((textPart, index) => {
      const styles = styleMap({
        height: `${this.radius}px`,
        transform: `rotate(${index * step + start}deg)`
      });
      const spacedPart = textPart === ' ' ? html`&nbsp` : textPart;
      return html`
        <div aria-hidden="true" style=${styles}>${spacedPart}</div>
      `;
    });

    return html`
      <div id="wrapper" aria-label=${this.text}>
        ${textPartTemplates}
      </div>
    `;
  }
}