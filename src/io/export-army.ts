import { stringify } from 'yaml';
import type { ArmyState } from '../types';
import type { YamlArmyFile, YamlUnitData, YamlArmyData } from './yaml-schema';
import { CURRENT_YAML_VERSION } from './yaml-schema';

function convertArmyToYaml(army: ArmyState | null): YamlArmyData | null {
  if (!army) {
    return null;
  }

  const units: YamlUnitData[] = army.units.map((unit) => {
    const yamlUnit: YamlUnitData = {
      name: unit.name,
      role: unit.role,
      faction: unit.faction,
    };

    if (unit.subFaction) {
      yamlUnit.subFaction = unit.subFaction;
    }

    if (unit.officerOfTheLine !== undefined) {
      yamlUnit.officerOfTheLine = unit.officerOfTheLine;
    }

    return yamlUnit;
  });

  const yamlArmy: YamlArmyData = {
    allegiance: army.allegiance,
    primaryFaction: army.primaryFaction,
    units,
  };

  if (army.primarySubFaction) {
    yamlArmy.primarySubFaction = army.primarySubFaction;
  }

  return yamlArmy;
}

export function exportArmyToYaml(army: ArmyState | null, customUnitNames: string[]): string {
  const yamlFile: YamlArmyFile = {
    version: CURRENT_YAML_VERSION,
    exportedAt: new Date().toISOString(),
    army: convertArmyToYaml(army),
    customUnitNames,
  };

  return stringify(yamlFile, {
    indent: 2,
    lineWidth: 0,
  });
}
