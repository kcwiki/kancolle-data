export interface API {
  api_mst_bgm: APIMstBgm[]
  api_mst_const: APIMstConst
  api_mst_equip_exslot: number[]
  api_mst_equip_exslot_ship: APIMstEquipExslotShip
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
  '10': The10
  '106': The106
  '12': The12
  '124': The10
  '130': The10
  '142': The12
  '210': The106
  '211': The106
  '220': The220
  '226': The10
  '227': The10
  '234': The12
  '240': The106
  '27': The106
  '275': The106
  '28': The106
  '317': The12
  '33': The10
  '34': The106
  '35': The12
  '384': The106
  '408': The12
  '410': The10
  '411': The10
  '413': The106
  '442': The106
  '443': The106
  '450': The106
  '458': The106
  '460': The12
  '463': The12
  '464': The10
  '477': The12
  '478': The12
  '483': The12
  '488': The10
  '506': The10
  '517': The106
  '519': The106
  '524': The12
  '525': The10
  '526': The10
  '527': The106
  '528': The12
  '66': The220
  '71': The106
  '87': The106
  '88': The106
}

export interface The10 {
  api_ctypes: The10_APICtypes | null
  api_req_level: number
  api_ship_ids: The10_APIShipIDS | null
  api_stypes: The10_APIStypes | null
}

export interface The10_APICtypes {
  '47': number
  '55': number
}

export interface The10_APIShipIDS {
  '145'?: number
  '147'?: number
  '235'?: number
  '399'?: number
  '407'?: number
  '419'?: number
  '464'?: number
  '470'?: number
  '537'?: number
  '538'?: number
  '546'?: number
  '557'?: number
  '558'?: number
  '578'?: number
  '593'?: number
  '607'?: number
  '656'?: number
  '911'?: number
  '916'?: number
  '954'?: number
  '955'?: number
  '960'?: number
  '961'?: number
  '968'?: number
  '971'?: number
  '972'?: number
  '975'?: number
  '976'?: number
  '977'?: number
}

export interface The10_APIStypes {
  '1'?: number
  '99'?: number
}

export interface The106 {
  api_ctypes: The106_APICtypes | null
  api_req_level: number
  api_ship_ids: The106_APIShipIDS | null
  api_stypes: The106_APIStypes | null
}

export interface The106_APICtypes {
  '101'?: number
  '108'?: number
  '112'?: number
  '114'?: number
  '122'?: number
  '16'?: number
  '20'?: number
  '30'?: number
  '38'?: number
  '4'?: number
  '41'?: number
  '43'?: number
  '52'?: number
  '54'?: number
  '67'?: number
  '78'?: number
  '88'?: number
}

export interface The106_APIShipIDS {
  '136'?: number
  '148'?: number
  '229'?: number
  '316'?: number
  '546'?: number
  '591'?: number
  '592'?: number
  '593'?: number
  '894'?: number
  '899'?: number
  '911'?: number
  '916'?: number
  '951'?: number
  '954'?: number
  '961'?: number
  '975'?: number
  '979'?: number
}

export interface The106_APIStypes {
  '13': number
  '14': number
}

export interface The12 {
  api_ctypes: The12_APICtypes | null
  api_req_level: number
  api_ship_ids: The12_APIShipIDS | null
  api_stypes: The12_APIStypes | null
}

export interface The12_APICtypes {
  '108': number
  '67': number
  '88': number
}

export interface The12_APIShipIDS {
  '546'?: number
  '621'?: number
  '626'?: number
  '911'?: number
  '916'?: number
}

export interface The12_APIStypes {
  '10'?: number
  '11'?: number
  '17'?: number
  '18'?: number
  '19'?: number
  '20'?: number
  '21'?: number
  '22'?: number
  '5'?: number
  '6'?: number
  '7'?: number
  '8'?: number
  '9'?: number
}

export interface The220 {
  api_ctypes: The220_APICtypes
  api_req_level: number
  api_ship_ids: The220_APIShipIDS
  api_stypes: The220_APIStypes
}

export interface The220_APICtypes {
  '41': number
}

export interface The220_APIShipIDS {
  '488': number
  '501': number
  '502': number
  '503': number
  '504': number
  '506': number
  '507': number
  '508': number
  '509': number
  '883': number
  '888': number
  '894': number
  '899': number
}

export interface The220_APIStypes {
  '19': number
  '20': number
  '21': number
}

export interface APIMstEquipShip {
  api_equip_type: number[]
  api_ship_id: number
}

export interface APIMstFurniture {
  api_active_flag: number
  api_bgm_id: number
  api_description: string
  api_id: number
  api_no: number
  api_outside_id: number
  api_price: number
  api_rarity: number
  api_saleflg: number
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
  api_max_maphp: null
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
  api_sp_flag?: number
  api_version: string[]
  api_weda?: number[]
  api_wedb?: number[]
}

export interface APIMstShipupgrade {
  api_arms_mat_count: number
  api_aviation_mat_count: number
  api_boiler_count?: number
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
  '95': number
}

export interface APIMstUseitem {
  api_category: number
  api_description: string[]
  api_id: number
  api_name: string
  api_price: number
  api_usetype: number
}
