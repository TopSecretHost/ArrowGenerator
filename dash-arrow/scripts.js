// scripts.js
function applyChanges() {
    const arrowColor = document.getElementById('arrowColor').value;
    const pathColor = document.getElementById('pathColor').value;
    const pathWidth = document.getElementById('pathWidth').value;
    const arrowSize = document.getElementById('arrowSize').value;
    const pathDuration = document.getElementById('pathDuration').value;
    const arrowDuration = document.getElementById('arrowDuration').value;

    const path = document.getElementById('Path-1');
    const arrow = document.getElementById('arrow');
    const animateArrow = document.getElementById('animateArrow');

    path.setAttribute('stroke', pathColor);
    path.setAttribute('stroke-width', pathWidth);
    arrow.setAttribute('fill', arrowColor);

    // Update arrow size
    const arrowPoints = `0,-${arrowSize/2} ${arrowSize},0 0,${arrowSize/2} ${arrowSize/2},0`;
    arrow.setAttribute('points', arrowPoints);

    // Update animation durations
    document.styleSheets[0].insertRule(`@keyframes dash { to { stroke-dashoffset: 0; } }`, 0);
    path.style.animation = `dash ${pathDuration}s linear forwards`;

    animateArrow.setAttribute('dur', `${arrowDuration}s`);
}

function resetAnimation() {
    const svg = document.getElementById('svgElement');
    svg.parentNode.replaceChild(svg.cloneNode(true), svg);
}

function exportCode() {
    const svg = document.getElementById('svgElement').outerHTML;
    const arrowColor = document.getElementById('arrowColor').value;
    const pathColor = document.getElementById('pathColor').value;
    const pathWidth = document.getElementById('pathWidth').value;
    const arrowSize = document.getElementById('arrowSize').value;
    const pathDuration = document.getElementById('pathDuration').value;
    const arrowDuration = document.getElementById('arrowDuration').value;

    const cssCode = `
.path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dash ${pathDuration}s linear forwards;
    animation-iteration-count: 1;
    animation-delay: 1s;
    stroke-width: ${pathWidth};
}

@keyframes dash {
    to {
        stroke-dashoffset: 0;
    }
}

.dashed {
    stroke-dasharray: 5, 12;
}

#arrow {
    animation: arrow ${arrowDuration}s linear forwards;
    opacity: 0;
}

@keyframes arrow {
    to {
        opacity: 1;
    }
}
`;

    const arrowPoints = `0,-${arrowSize/2} ${arrowSize},0 0,${arrowSize/2} ${arrowSize/2},0`;

    const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Animated Arrow</title>
    <style>
${cssCode}
    </style>
</head>
<body>
    <div class="graph__wrapper">
        <svg id="svgElement" width="315px" height="107px" viewBox="0 0 315 107" version="1.1" style="overflow:visible">
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                <path id="Path-1" class="path" fill="none" stroke="${pathColor}" stroke-width="${pathWidth}" stroke-linejoin="round" stroke-miterlimit="10" d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81"/>
                <path class="dashed" fill="none" stroke="white" stroke-width="8" stroke-linejoin="round" stroke-miterlimit="10" d="M1.4,2.1c0,0,86,57,211.5,41.5s172.5-24.5,289,81"/>   
                <polyline id="arrow" points="${arrowPoints}" fill="${arrowColor}">
                    <animateMotion id="animateArrow" rotate="auto" begin="1s" dur="${arrowDuration}s" repeatCount="1" fill="freeze">
                        <mpath xlink:href="#Path-1" />
                    </animateMotion>
                </polyline>
            </g>
        </svg>
    </div>
</body>
</html>
`;

    const cssBlob = new Blob([cssCode], { type: 'text/css' });
    const htmlBlob = new Blob([htmlCode], { type: 'text/html' });

    const cssUrl = URL.createObjectURL(cssBlob);
    const htmlUrl = URL.createObjectURL(htmlBlob);

    const cssLink = document.createElement('a');
    cssLink.href = cssUrl;
    cssLink.download = 'styles.css';
    cssLink.textContent = 'Download CSS';
    document.body.appendChild(cssLink);

    const htmlLink = document.createElement('a');
    htmlLink.href = htmlUrl;
    htmlLink.download = 'index.html';
    htmlLink.textContent = 'Download HTML';
    document.body.appendChild(htmlLink);

    cssLink.click();
    htmlLink.click();

    document.body.removeChild(cssLink);
    document.body.removeChild(htmlLink);
}
    