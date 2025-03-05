import { loadSlackSettings } from './slack-settings';
import { SettingsContent } from './settings-content';

export default async function SettingsPage() {
  const slackConfig = await loadSlackSettings();
  return <SettingsContent initialSlackConfig={slackConfig} />;
}
