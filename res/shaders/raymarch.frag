#version 440 core

uniform float iTime;
out vec4 FragColor;

// Function to compute the distance to the nearest surface (a sphere)
float sphereSDF(vec3 p, float r) {
    return length(p) - r; // Signed Distance Function for a sphere
}

// Function to compute the distance to the nearest surface (a cube)
float cubeSDF(vec3 p, vec3 size) {
    vec3 d = abs(p) - size; // Distance from the point to the cube's sides
    return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0); // Distance to the cube
}

// Scene distance function that combines the sphere and cube
float sceneSDF(vec3 p) {
    float minDist = 1e6; // Initialize a large value to find the minimum distance

    // Number of cubes
    int numCubes = 200;

    // Calculate positions for cubes in a grid pattern
    for (int i = 0; i < numCubes; i++) {
        // Example: arrange cubes in a grid
        vec3 offset = vec3(float(i % 10) * 2.0, 0.0, float(i / 10) * 2.0); // Adjust spacing as needed
        float cubeDist = cubeSDF(p - offset, vec3(0.5)); // Cube with size 1 at the offset position
        minDist = min(minDist, cubeDist); // Update the minimum distance
    }

    return minDist; // Return the closest distance to any cube
}

// Normal calculation using finite differences
vec3 getNormal(vec3 p) {
    const float eps = 0.001;
    return normalize(vec3(
        sceneSDF(p + vec3(eps, 0.0, 0.0)) - sceneSDF(p - vec3(eps, 0.0, 0.0)),
        sceneSDF(p + vec3(0.0, eps, 0.0)) - sceneSDF(p - vec3(0.0, eps, 0.0)),
        sceneSDF(p + vec3(0.0, 0.0, eps)) - sceneSDF(p - vec3(0.0, 0.0, eps))
    ));
}

// Lighting calculation
vec3 calculateLighting(vec3 p, vec3 normal) {
    vec3 lightDir = normalize(vec3(-10.0, 20.0, -10.0)); // Direction of the light
    float diff = max(dot(normal, lightDir), 0.0); // Diffuse component
    return vec3(sin(iTime) / 4.0, cos(iTime) / 3.0, sin(iTime) / 2.0) * diff; // Color with lighting effect (orange)
}

// Raymarching function
float raymarch(vec3 origin, vec3 direction) {
    float totalDistance = 0.0;
    const float MAX_DISTANCE = 100.0;
    const float EPSILON = 0.001;

    for (int i = 0; i < 200; i++) {
        vec3 p = origin + totalDistance * direction; // Current point along the ray
        float distance = sceneSDF(p); // Distance to the nearest object

        if (distance < EPSILON) {
            return totalDistance; // Hit an object
        }

        totalDistance += distance; // Accumulate distance

        if (totalDistance > MAX_DISTANCE) {
            break; // Prevent marching too far
        }
    }

    return MAX_DISTANCE; // No hit
}


void main() {
    // Camera setup
    vec3 cameraPos = vec3(3*sin(iTime), 10.0, 3*cos(iTime) + 20.0); // Camera position

    // Alternatively, you can still use screen coordinates for perspective projection
    vec3 rayDirection = normalize(vec3(gl_FragCoord.xy / vec2(1280.0, 720.0) * 2.0 - 1.0, -1.0)); 

    // Raymarching
    float distance = raymarch(cameraPos, rayDirection);

    // Color based on distance
    if (distance < 100.0) {
        vec3 hitPoint = cameraPos + rayDirection * distance; // Calculate the hit point
        vec3 normal = getNormal(hitPoint); // Get the normal at the hit point
        vec3 lightColor = calculateLighting(hitPoint, normal); // Calculate lighting
        FragColor = vec4(lightColor, 1.0); // Set final color
    } else {
        FragColor = vec4(0.9, 0.9, 0.9, 1.0); // Background (gray color)
    }
}

