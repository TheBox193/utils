import config, { Environment } from './config';

export const isDevelopment = process.env.REACT_APP_STAGE === 'development';
export const isStaging = process.env.REACT_APP_STAGE === 'staging';
export const isDevelopmentOrStaging = isDevelopment || isStaging;
export const isLocal = () => config.environment === Environment.Local;

const featureFlags = {
  // sampleGloballyDisabledFeature: false,
  // sampleGloballyEnabledFeature: true,
  // sampleDevelopmentBuildEnabledFeature: isDevelopment,
  // sampleStagingEnableBuildFeature: isStaging,
  // sampleDec_21_2021EnableFeature: isPastDate('2016-05-25', '')
};

export type FeatureFlags = typeof featureFlags;
export type FeatureFlagsEnum = keyof FeatureFlags;

export default featureFlags;