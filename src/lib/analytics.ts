import ReactGA from "react-ga4";

const isProduction = process.env.NODE_ENV === "production";
const MEASUREMENT_ID = "G-5VF5W3XLFG";

export const initGA = () => {
  if (!isProduction) {
    ReactGA.initialize(MEASUREMENT_ID, { 
        gaOptions: {
          debug_mode: true
        },
        gtagOptions: {
          debug_mode: true
        }
    });
  } else {
    ReactGA.initialize(MEASUREMENT_ID, { 
        gaOptions: {
          debug_mode: true
        },
        gtagOptions: {
          debug_mode: true
        }
    });
  }
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};

type EventParams = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export const logEvent = ({ category, action, label, value }: EventParams) => {
//   if (!isProduction) {
//     console.log("GA Event", { category, action, label, value });
//     return;
//   }
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
