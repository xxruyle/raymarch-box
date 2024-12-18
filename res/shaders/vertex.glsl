#version 440 core
layout(location = 0) in vec3 aPos;

out vec2 fragCoord;
uniform mat4 translation;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main() {
  gl_Position = projection * view * model * vec4(aPos, 1.0f);

  // fragCoord = (gl_Position.xy + vec2(1.0)) / 2.0; // Normalize to [0, 1]
}
