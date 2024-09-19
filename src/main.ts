import "./style.css";

function main() {
    // Canvas
    const canvas = document.createElement("canvas");
    canvas.width = 512 * 1.5;
    canvas.height = 512 * 1.5;

    document.body.appendChild(canvas);

    // WebGL Context
    const gl = canvas.getContext("webgl2");

    if (!gl) {
        throw "WebGL 2.0 is not supported";
    }

    // Create buffer with [0.0, 0.0] data
    const vertices: number[] = [0.0, 0.0];

    const vertexBuffer = gl.createBuffer();

    if (!vertexBuffer) {
        throw new Error("Vertex buffer could not be created");
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Vertex shader
    const vertexShaderSource = `
        attribute vec2 a_position;

        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            gl_PointSize = 10.0;
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);

    if (!vertexShader) {
        throw new Error("Could not create vertex shader!");
    }

    gl.shaderSource(vertexShader, vertexShaderSource);

    gl.compileShader(vertexShader);

    // Fragment shader
    const fragmentShaderSource = `
        precision mediump float;

        void main() {
        	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
    `;

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
        throw new Error("Could not create fragment shader!");
    }

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Pipeline program
    const program = gl.createProgram();

    if (!program) {
        throw new Error("Could not create the program!");
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    gl.useProgram(program);

    // Clear frame buffer
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render point with the position from the ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.drawArrays(gl.POINTS, 0, vertices.length / 2);
}

main();
