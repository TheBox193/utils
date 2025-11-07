/* eslint-disable no-console, @typescript-eslint/no-explicit-any */
import featureFlags, { FeatureFlags, FeatureFlagsEnum } from './featureFlags';
import get from 'lodash/get';

type FeatureFlagOverrides = Partial<FeatureFlags>;
let featureFlagOverrides: FeatureFlagOverrides = {};

export const isDevelopment = process.env.REACT_APP_STAGE === 'development';
export const isStaging = process.env.REACT_APP_STAGE === 'staging';
export const isDevelopmentOrStaging = isDevelopment || isStaging;

const hydrateOverrides = () => {
  const flagOverridesString = (localStorage && localStorage.getItem('featureFlagOverrides')) ?? '{}';
  const flagOverrides = JSON.parse(flagOverridesString) ?? {};
  featureFlagOverrides = flagOverrides;
};

const getFeatureFlagWithOverrides = () => ({ ...featureFlags, ...featureFlagOverrides });

export default function hasFeatureFlag(featureFlagName: FeatureFlagsEnum): boolean {
  const currentFeatureFlags = getFeatureFlagWithOverrides();
  return get(currentFeatureFlags, featureFlagName, false);
}

const report = () => {
  const resultFlags = getFeatureFlagWithOverrides();
  const reportValues = Object.keys(resultFlags).reduce((result, _key) => {
    const key = _key as FeatureFlagsEnum;

    const row = {
      before: featureFlags[key],
      override: featureFlagOverrides[key],
      result: resultFlags[key],
    };
    return { ...result, [key]: row };
  }, {} as any);

  console.info(
    '%c🧪 Current flag overrides',
    'background-color: lightgreen; color: #111111; padding: 4px 12px; border-radius: 4px;',
  );
  console.table(reportValues);
};

const storeFeatureFlagOverride = (newFeatureFlags: FeatureFlagOverrides) => {
  featureFlagOverrides = newFeatureFlags;
  localStorage.setItem('featureFlagOverrides', JSON.stringify(newFeatureFlags));
  report();
  // IDK why but this line is important for localization to initialize for unit tests.
  // Disable this line and remove the import then run unit tests to see what I mean.
  document.location.reload();
};

const set = (featureFlagName: FeatureFlagsEnum, state: boolean) => {
  const newFlag = { [featureFlagName]: state };
  const newFeatureFlagOverrides = { ...featureFlagOverrides, ...newFlag };
  storeFeatureFlagOverride(newFeatureFlagOverrides);
};

const resetAll = () => {
  const newFeatureFlagOverrides = {};
  storeFeatureFlagOverride(newFeatureFlagOverrides);
};

const reset = (featureFlagName: FeatureFlagsEnum) => {
  const { [featureFlagName]: flagRemoved, ...currentFlags } = featureFlagOverrides;

  const newFeatureFlagOverrides = { ...currentFlags };
  storeFeatureFlagOverride(newFeatureFlagOverrides);
};

const setTrue = (featureFlagName: FeatureFlagsEnum) => set(featureFlagName, true);
const setFalse = (featureFlagName: FeatureFlagsEnum) => set(featureFlagName, false);

const windowFeatureFlags = {
  report,
  override: {
    set,
    setTrue,
    setFalse,
    reset,
    resetAll,
  },
};

declare global {
  interface Window {
    featureFlags: typeof windowFeatureFlags;
  }
}

hydrateOverrides();

export const initFeatureFlagOverrides = async (): Promise<void> => {
  window.featureFlags = windowFeatureFlags;

  console.groupCollapsed(
    '%c🧪 Feature Flag Overrides available',
    'background-color: lightgreen; color: #111111; padding: 4px 12px; border-radius: 4px;',
    '(window.featureFlags)',
  );
  report();
  console.info(window.featureFlags);
  console.groupEnd();
};
