#version 440 core
out vec4 FragColor;
uniform float u_time;

void main() { FragColor = vec4(1.0f, 0.5f * u_time, 0.2f, 1.0f); }
