/**
 * Central Image Configuration for Jerry John Powers Pvt. Ltd.
 * -------------------------------------------------------------------------
 * Swap any path below with your own hosted URL or local asset path.
 * Leave a string empty ('') to automatically display the built-in CSS/SVG fallback.
 */

/**
 * Hero Morning / Night Image Slots
 * Recommended size: 2400x1350 (16:9), identical camera angle and building framing
 * for both images so crossfade and light-wipe transitions align seamlessly.
 */
export const heroMorning = '/src/assets/images/hero_morning_hd.jpg';
export const heroNight = '/src/assets/images/hero_night_hd.jpg';

export const SITE_IMAGES = {
  heroMorning,
  heroNight,
  services: {
    rooftop: '/src/assets/images/dusk_rooftop_commercial_1795243245071.jpg',
    groundMounted: '/src/assets/images/dusk_ground_solar_plant_1795243244908.jpg',
    streetLightsMorning:
      '/src/assets/images/services_streetlights_morning_1795246863885.jpg',
    streetLightsNight:
      '/src/assets/images/services_streetlights_night_1795246879890.jpg',
  },
  projects: {
    reliance: '/src/assets/images/dusk_ground_solar_plant_1795243244908.jpg',
    shapoorji: '/src/assets/images/substation_epc_grid_1795241263893.jpg',
    nhpc: '/src/assets/images/dusk_ground_solar_plant_1795243244908.jpg',
    grt: '/src/assets/images/substation_epc_grid_1795241263893.jpg',
    ashokLeyland: '/src/assets/images/dusk_rooftop_commercial_1795243245071.jpg',
    ascendas: '/src/assets/images/vertical_solar_facade_1795241263793.jpg',
    sastra: '/src/assets/images/dusk_rooftop_commercial_1795243245071.jpg',
    dell: '/src/assets/images/vertical_solar_facade_1795241263793.jpg',
  },
  gallery: {
    rooftop1: '/src/assets/images/dusk_rooftop_commercial_1795243245071.jpg',
    rooftop2: '/src/assets/images/vertical_solar_facade_1795241263793.jpg',
    rooftop3: '/src/assets/images/hero_dusk_solar_architecture_1795243245170.jpg',
    ground1: '/src/assets/images/dusk_ground_solar_plant_1795243244908.jpg',
    ground2: '/src/assets/images/substation_epc_grid_1795241263893.jpg',
    ground3: '/src/assets/images/dusk_ground_solar_plant_1795243244908.jpg',
    videoPoster: '/src/assets/images/dusk_ground_solar_plant_1795243244908.jpg',
  },
} as const;
