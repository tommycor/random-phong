

#define M_PI 3.1415926535897932384626433832795
#define DIST 300.0
#define TIME_FACTOR .01

uniform float time;

attribute float size;

void main() {

	vec4 mvPosition = modelViewMatrix * vec4( position, 1. );

    gl_Position = projectionMatrix * mvPosition;
}