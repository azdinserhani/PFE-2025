export const services = [
  {
    route: "/api/v1/auth",
    target: process.env.AUTH_SERVICE_URL,
  },
  {
    route: "/api/v1/course",
    target: process.env.COURSE_SERVICE_URL,
  },
  {
    route: "/api/v1/media",
    target: process.env.MEDIA_SERVICE_URL,
  },
];
