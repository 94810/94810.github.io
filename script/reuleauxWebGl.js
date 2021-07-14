var canvas = document.querySelector('#d83c82a0-0194-4b99-a3e7-c1e239b61745');
var gl = canvas.getContext("webgl2");

let mouseX = 5;
let mouseY = 5;

function setMousePosition(e) {
  const rect = canvas.getBoundingClientRect();
  mouseX = (1 - (e.clientX - rect.left) / gl.canvas.width) * 10;
  mouseY = (1 - (rect.height - (e.clientY - rect.top) - 1) / gl.canvas.height) * 10;  // bottom is 0 in WebGL
}
canvas.addEventListener('mousemove', setMousePosition);

var fragmentShaderSrc = `#version 300 es

#define PI 3.1415926535897932384626433832795
#define FREQ 10.0
#define SIN33 0.86602540378
#define RAD66 2.09439510239

precision highp float;

out vec4 outColor;
in vec2 v;
uniform float t;
uniform vec2 mouse;

void main() {

  float base = 0.0;
  vec2 scaled = v*FREQ - FREQ / 2.0;

  // calculate base plasma
  base += sin(scaled.x+t);
  base += sin(scaled.y+t)/2.0;
  base += cos(scaled.x+scaled.y+t)/3.0;
  base += sin((scaled.x+mouse.x)*(scaled.y+mouse.y)/2.0)/(2.0*sin(t*FREQ)+4.0);
  scaled += FREQ/2.0 * vec2(sin(t/3.0), cos(t/2.0));
  base += sin(sqrt(scaled.x*scaled.x + scaled.y*scaled.y+1.0)+t*3.0);
  base = base/2.0;

  // add color
  vec3 color = vec3(sin(base*PI)*0.5, sin(base*PI+t/2.0), sin((base+t)*FREQ));

  // check if pixel is in rotating rtriangle
  float eq1 = (v.x + sin(t)) * (v.x + sin(t)) + (v.y - cos(t)) * (v.y - cos(t));
  float eq2 = (v.x + sin(t+RAD66)) * (v.x + sin(t+RAD66)) +  (v.y - cos(t+RAD66)) * (v.y - cos(t+RAD66));
  float eq3 = (v.x + sin(t-RAD66)) * (v.x + sin(t-RAD66)) +  (v.y - cos(t-RAD66)) * (v.y - cos(t-RAD66));

  if(eq1 <= 3.0 && eq2 <= 3.0 && eq3 <= 3.0 ){
    outColor = vec4(color*.5 + .5 ,1);
  } else {
    outColor = vec4(1.0-(color*.5 + .5) ,1);
  }
}`;
var vertexShaderSource = `#version 300 es
in vec4 a_position;
out vec2 v;

void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  v = a_position.xy;
  gl_Position = a_position;
}
`;

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSrc);

const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const timeLocation = gl.getUniformLocation(program, "t");
const mouseLocation = gl.getUniformLocation(program, "mouse");

const positionBuffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = [
  1, -1,
  -1, 1,
  -1, -1,

  1, 1,
  1, -1,
  -1, 1,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

const vao = gl.createVertexArray();

gl.bindVertexArray(vao);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(
  positionAttributeLocation,
  2,
  gl.FLOAT,
  false,
  0,
  0,
)

function render(time) {
  time /= 1000;

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);

  gl.bindVertexArray(vao);
  gl.uniform2f(mouseLocation, mouseX, mouseY);
  gl.uniform1f(timeLocation, time);

  gl.drawArrays(gl.TRIANGLES, 0, 6);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
/// FNCT

function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return program;
  } else {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
  }
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  } else {
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
}