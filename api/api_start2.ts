export interface API {
  api_mst_bgm: APIMstBgm[]
  api_mst_const: APIMstConst
  api_mst_equip_exslot: number[]
  api_mst_equip_exslot_ship: APIMstEquipExslotShip[]
  api_mst_equip_ship: APIMstEquipShip[]
  api_mst_furniture: APIMstFurniture[]
  api_mst_furnituregraph: APIMstFurnituregraph[]
  api_mst_item_shop: APIMstItemShop
  api_mst_maparea: APIMstMaparea[]
  api_mst_mapbgm: APIMstMapbgm[]
  api_mst_mapinfo: APIMstMapinfo[]
  api_mst_mission: APIMstMission[]
  api_mst_payitem: APIMstPayitem[]
  api_mst_ship: APIMstShip[]
  api_mst_shipgraph: APIMstShipgraph[]
  api_mst_shipupgrade: APIMstShipupgrade[]
  api_mst_slotitem: APIMstSlotitem[]
  api_mst_slotitem_equiptype: APIMstSlotitemEquiptype[]
  api_mst_stype: APIMstStype[]
  api_mst_useitem: APIMstUseitem[]
}

export interface APIMstBgm {
  api_id: number
  api_name: string
}

export interface APIMstConst {
  api_boko_max_ships: APIBokoMaxShipsClass
  api_dpflag_quest: APIBokoMaxShipsClass
  api_parallel_quest_max: APIBokoMaxShipsClass
}

export interface APIBokoMaxShipsClass {
  api_int_value: number
  api_string_value: string
}

export interface APIMstEquipExslotShip {
  api_ship_ids: number[]
  api_slotitem_id: number
}

export interface APIMstEquipShip {
  api_equip_type: number[]
  api_ship_id: number
}

export interface APIMstFurniture {
  api_active_flag: number
  api_description: string
  api_id: number
  api_no: number
  api_outside_id: number
  api_price: number
  api_rarity: number
  api_saleflg: number
  api_season: number
  api_title: string
  api_type: number
  api_version: number
}

export interface APIMstFurnituregraph {
  api_filename: string
  api_id: number
  api_no: number
  api_type: number
  api_version: string
}

export interface APIMstItemShop {
  api_cabinet_1: number[]
  api_cabinet_2: number[]
}

export interface APIMstMaparea {
  api_id: number
  api_name: string
  api_type: number
}

export interface APIMstMapbgm {
  api_boss_bgm: number[]
  api_id: number
  api_map_bgm: number[]
  api_maparea_id: number
  api_moving_bgm: number
  api_no: number
}

export interface APIMstMapinfo {
  api_id: number
  api_infotext: string
  api_item: number[]
  api_level: number
  api_maparea_id: number
  api_max_maphp: number | null
  api_name: string
  api_no: number
  api_opetext: string
  api_required_defeat_count: number | null
  api_sally_flag: number[]
}

export interface APIMstMission {
  api_damage_type: number
  api_deck_num: number
  api_details: string
  api_difficulty: number
  api_disp_no: string
  api_id: number
  api_maparea_id: number
  api_name: string
  api_reset_type: number
  api_return_flag: number
  api_sample_fleet: number[]
  api_time: number
  api_use_bull: number
  api_use_fuel: number
  api_win_item1: number[]
  api_win_item2: number[]
  api_win_mat_level: number[]
}

export interface APIMstPayitem {
  api_description: string
  api_id: number
  api_item: number[]
  api_name: string
  api_price: number
  api_shop_description: string
  api_type: number
}

export interface APIMstShip {
  api_afterbull?: number
  api_afterfuel?: number
  api_afterlv?: number
  api_aftershipid?: string
  api_backs?: number
  api_broken?: number[]
  api_buildtime?: number
  api_bull_max?: number
  api_ctype: number
  api_fuel_max?: number
  api_getmes?: string
  api_houg?: number[]
  api_id: number
  api_leng?: number
  api_luck?: number[]
  api_maxeq?: number[]
  api_name: string
  api_powup?: number[]
  api_raig?: number[]
  api_slot_num: number
  api_soku: number
  api_sort_id: number
  api_sortno?: number
  api_souk?: number[]
  api_stype: number
  api_taik?: number[]
  api_tais?: number[]
  api_tyku?: number[]
  api_voicef?: number
  api_yomi: string
}

export interface APIMstShipgraph {
  api_battle_d?: number[]
  api_battle_n?: number[]
  api_boko_d?: number[]
  api_boko_n?: number[]
  api_ensyue_n?: number[]
  api_ensyuf_d?: number[]
  api_ensyuf_n?: number[]
  api_filename: string
  api_id: number
  api_kaisyu_d?: number[]
  api_kaisyu_n?: number[]
  api_kaizo_d?: number[]
  api_kaizo_n?: number[]
  api_map_d?: number[]
  api_map_n?: number[]
  api_pa?: number[]
  api_pab?: number[]
  api_sortno?: number
  api_version: string[]
  api_weda?: number[]
  api_wedb?: number[]
}

export interface APIMstShipupgrade {
  api_arms_mat_count: number
  api_aviation_mat_count: number
  api_catapult_count: number
  api_current_ship_id: number
  api_drawing_count: number
  api_id: number
  api_original_ship_id: number
  api_report_count: number
  api_sortno: number
  api_upgrade_level: number
  api_upgrade_type: number
}

export interface APIMstSlotitem {
  api_atap: number
  api_bakk: number
  api_baku: number
  api_broken: number[]
  api_cost?: number
  api_distance?: number
  api_houg: number
  api_houk: number
  api_houm: number
  api_id: number
  api_leng: number
  api_luck: number
  api_name: string
  api_raig: number
  api_raik: number
  api_raim: number
  api_rare: number
  api_sakb: number
  api_saku: number
  api_soku: number
  api_sortno: number
  api_souk: number
  api_taik: number
  api_tais: number
  api_tyku: number
  api_type: number[]
  api_usebull: string
  api_version?: number
}

export interface APIMstSlotitemEquiptype {
  api_id: number
  api_name: string
  api_show_flg: number
}

export interface APIMstStype {
  api_equip_type: APIEquipType
  api_id: number
  api_kcnt: number
  api_name: string
  api_scnt: number
  api_sortno: number
}

export interface APIEquipType {
  '1': number
  '10': number
  '11': number
  '12': number
  '13': number
  '14': number
  '15': number
  '16': number
  '17': number
  '18': number
  '19': number
  '2': number
  '20': number
  '21': number
  '22': number
  '23': number
  '24': number
  '25': number
  '26': number
  '27': number
  '28': number
  '29': number
  '3': number
  '30': number
  '31': number
  '32': number
  '33': number
  '34': number
  '35': number
  '36': number
  '37': number
  '38': number
  '39': number
  '4': number
  '40': number
  '41': number
  '42': number
  '43': number
  '44': number
  '45': number
  '46': number
  '47': number
  '48': number
  '49': number
  '5': number
  '50': number
  '51': number
  '52': number
  '53': number
  '54': number
  '55': number
  '56': number
  '57': number
  '58': number
  '59': number
  '6': number
  '60': number
  '61': number
  '62': number
  '63': number
  '64': number
  '65': number
  '66': number
  '67': number
  '68': number
  '69': number
  '7': number
  '70': number
  '71': number
  '72': number
  '73': number
  '74': number
  '75': number
  '76': number
  '77': number
  '78': number
  '79': number
  '8': number
  '80': number
  '81': number
  '82': number
  '83': number
  '84': number
  '85': number
  '86': number
  '87': number
  '88': number
  '89': number
  '9': number
  '90': number
  '91': number
  '92': number
  '93': number
  '94': number
}

export interface APIMstUseitem {
  api_category: number
  api_description: string[]
  api_id: number
  api_name: string
  api_price: number
  api_usetype: number
}
