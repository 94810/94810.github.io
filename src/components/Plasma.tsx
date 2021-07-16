// @ts-nocheck
import * as React from "react";

export const CanvasBackground = () => {
  React.useEffect(
    () => {
      var canvas = document.querySelector('#d83c82a0-0194-4b99-a3e7-c1e239b61745');
      var gl = canvas.getContext("webgl2");

      let mouseX = 5;
      let mouseY = 5;
      let scaleX = 1;
      let scaleY = 1;

      function setMousePosition(e) {
        const rect = canvas.getBoundingClientRect();
        mouseX = (((e.clientX - rect.left) / gl.canvas.width)*2 - 1) * 10 ;
        mouseY = (((e.clientY - rect.top) / gl.canvas.height)*2 - 1) * -10;
      }
      canvas.addEventListener('mousemove', setMousePosition);

      function updateCanvasSizeAndScale(){
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const ratio =  gl.canvas.width/gl.canvas.height;

        scaleX = ratio > 1 ? ratio : 1;
        scaleY = ratio > 1 ? 1 : 1/ratio;
      }
      window.addEventListener('resize', updateCanvasSizeAndScale);
      updateCanvasSizeAndScale();

      var fragmentShaderSrc = `#version 300 es

      #define PI 3.1415926535897932384626433832795
      #define FREQ 5.0
      #define SIN33 0.86602540378
      #define RAD66 2.09439510239
      #define ALPHA 1.0

      precision highp float;

      out vec4 outColor;
      in vec2 v;
      uniform float t;
      uniform vec2 mouse;
      uniform vec2 res;

      void main() {

        float base = 0.0;
        vec2 scaled = v*res;
        vec2 vFreq = scaled*FREQ;
        vec4 b = vec4(0.8, 0.8, 0.8, 1);

        // calculate base plasma
        base += sin(vFreq.x+t);
        base += sin(vFreq.y+t)/2.0;
        base += cos(vFreq.x+vFreq.y+t)/3.0;
        base += sin((vFreq.x+mouse.x)*(vFreq.y+mouse.y)/2.0)/(2.0*sin(t*FREQ)+4.0);
        vFreq += FREQ/2.0 * vec2(sin(t/3.0), cos(t/2.0));
        base += sin(sqrt(vFreq.x*vFreq.x + vFreq.y*vFreq.y+1.0)+t*3.0);
        base = base/2.0;

        // add color
        vec3 color = vec3(sin(base*PI)*0.5, sin(base*PI+t/2.0), sin((base+t)*FREQ));

        // check if pixel is in rotating rtriangle
        float eq1 = (scaled.x + sin(t)) * (scaled.x + sin(t)) + (scaled.y - cos(t)) * (scaled.y - cos(t));
        float eq2 = (scaled.x + sin(t+RAD66)) * (scaled.x + sin(t+RAD66)) +  (scaled.y - cos(t+RAD66)) * (scaled.y - cos(t+RAD66));
        float eq3 = (scaled.x + sin(t-RAD66)) * (scaled.x + sin(t-RAD66)) +  (scaled.y - cos(t-RAD66)) * (scaled.y - cos(t-RAD66));

        if(eq1 <= 3.0 && eq2 <= 3.0 && eq3 <= 3.0 ){
          outColor = vec4(color*.5 + .5 ,1);
        } else {
          outColor = vec4(1.0-(color*.5 + .5) ,1);
        }

        outColor = outColor * ALPHA + b * ( 1.0 - ALPHA);
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
      const resLocation = gl.getUniformLocation(program, "res");

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
        gl.uniform2f(resLocation, scaleX, scaleY);
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
    },
    []
  );

  return <canvas id='d83c82a0-0194-4b99-a3e7-c1e239b61745' />;
}
