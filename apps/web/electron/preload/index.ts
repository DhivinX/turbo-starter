function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
    return new Promise((resolve) => {
        if (condition.includes(document.readyState)) {
            resolve(true);
        } else {
            document.addEventListener('readystatechange', () => {
                if (condition.includes(document.readyState)) {
                    resolve(true);
                }
            });
        }
    });
}

const safeDOM = {
    append(parent: HTMLElement, child: HTMLElement) {
        if (!Array.from(parent.children).find((e) => e === child)) {
            return parent.appendChild(child);
        }

        return null;
    },
    remove(parent: HTMLElement, child: HTMLElement) {
        if (Array.from(parent.children).find((e) => e === child)) {
            return parent.removeChild(child);
        }

        return null;
    },
};

/**
 * https://tobiasahlin.com/spinkit
 * https://connoratherton.com/loaders
 * https://projects.lukehaas.me/css-loaders
 * https://matejkustec.github.io/SpinThatShit
 */
function useLoading() {
    const className = `lds-ring`;
    const styleContent = `
        .app-loading-wrap {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #111827;
            z-index: 9;
        }

        .${className} {
            display: inline-block;
            position: relative;
            width: 64px;
            height: 64px;
        }

        .${className} div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 48px;
            height: 48px;
            margin: 8px;
            border: 3px solid #4F46E5;
            border-radius: 50%;
            animation: ${className} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #4F46E5 transparent transparent transparent;
        }

        .${className} div:nth-child(1) {
            animation-delay: -0.45s;
        }

        .${className} div:nth-child(2) {
            animation-delay: -0.3s;
        }

        .${className} div:nth-child(3) {
            animation-delay: -0.15s;
        }

        @keyframes ${className} {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    `;

    const oStyle = document.createElement('style');
    oStyle.innerHTML = styleContent;

    const oDiv = document.createElement('div');
    oDiv.className = 'app-loading-wrap';
    oDiv.innerHTML = `<div class="${className}"><div></div><div></div><div></div><div></div></div>`;

    return {
        appendLoading() {
            safeDOM.append(document.head, oStyle);
            safeDOM.append(document.body, oDiv);
        },
        removeLoading() {
            safeDOM.remove(document.head, oStyle);
            safeDOM.remove(document.body, oDiv);
        },
    };
}

// ----------------------------------------------------------------------

const { appendLoading, removeLoading } = useLoading();
domReady().then(appendLoading);

window.onmessage = (ev) => {
    ev.data.payload === 'removeLoading' && removeLoading();
};

setTimeout(removeLoading, 30000);
