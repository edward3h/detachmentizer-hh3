import { parse } from 'yaml';
import type { ArmyState, Unit } from '../types';
import { createUnit } from '../types';
import type { YamlArmyFile, YamlArmyData } from './yaml-schema';
import { validateYamlArmyFile } from './yaml-schema';

export interface ImportResult {
  success: true;
  army: ArmyState | null;
  customUnitNames: string[];
}

export interface ImportError {
  success: false;
  error: string;
}

export type ImportOutcome = ImportResult | ImportError;

function convertYamlToArmy(yamlArmy: YamlArmyData | null): ArmyState | null {
  if (!yamlArmy) {
    return null;
  }

  const units: Unit[] = yamlArmy.units.map((yamlUnit) =>
    createUnit(
      yamlUnit.name,
      yamlUnit.role,
      yamlUnit.faction,
      yamlUnit.subFaction,
      yamlUnit.officerOfTheLine
    )
  );

  const army: ArmyState = {
    allegiance: yamlArmy.allegiance,
    primaryFaction: yamlArmy.primaryFaction,
    units,
  };

  if (yamlArmy.primarySubFaction) {
    army.primarySubFaction = yamlArmy.primarySubFaction;
  }

  return army;
}

export function importArmyFromYaml(yamlContent: string): ImportOutcome {
  let parsed: unknown;

  try {
    parsed = parse(yamlContent);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: `Failed to parse YAML: ${message}` };
  }

  const validation = validateYamlArmyFile(parsed);
  if (!validation.valid) {
    return { success: false, error: validation.error! };
  }

  const yamlFile = parsed as YamlArmyFile;

  return {
    success: true,
    army: convertYamlToArmy(yamlFile.army),
    customUnitNames: yamlFile.customUnitNames,
  };
}
