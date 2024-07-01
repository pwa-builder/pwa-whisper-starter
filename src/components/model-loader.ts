import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('model-loader')
export class ModelLoader extends LitElement {

  static styles = css`
    :host {
        position: fixed;
        top: 29px;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;

        animation: quickup 0.3s;
    }

    #loader {
        background: var(--accent-base-color);
        border-radius: 22px;
        padding: 8px;
        padding-left: 14px;
        padding-right: 14px;
        font-size: 12px;
        box-shadow: #0000007a 0px 2px 6px 0px;
        color: white;
    }

    @keyframes quickfade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;

  render() {
    return html`
      <div id="loader">
        <span>Model Loading...</span>
      </div>
    `;
  }
}
