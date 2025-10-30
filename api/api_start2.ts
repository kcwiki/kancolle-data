export interface API {
  api_mst_bgm: APIMstBgm[]
  api_mst_const: APIMstConst
  api_mst_equip_exslot: number[]
  api_mst_equip_exslot_ship: APIMstEquipExslotShip
  api_mst_equip_limit_exslot: APIMstEquipLimitExslot
  api_mst_equip_ship: APIMstEquipShip
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
  '268': The10
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
  '100'?: number
  '1000'?: number
  '1001'?: number
  '1006'?: number
  '101'?: number
  '114'?: number
  '145'?: number
  '147'?: number
  '200'?: number
  '235'?: number
  '290'?: number
  '395'?: number
  '399'?: number
  '407'?: number
  '419'?: number
  '464'?: number
  '470'?: number
  '511'?: number
  '512'?: number
  '513'?: number
  '516'?: number
  '537'?: number
  '538'?: number
  '546'?: number
  '557'?: number
  '558'?: number
  '574'?: number
  '578'?: number
  '591'?: number
  '592'?: number
  '593'?: number
  '607'?: number
  '656'?: number
  '694'?: number
  '911'?: number
  '916'?: number
  '954'?: number
  '955'?: number
  '956'?: number
  '960'?: number
  '961'?: number
  '968'?: number
  '971'?: number
  '972'?: number
  '975'?: number
  '976'?: number
  '977'?: number
  '981'?: number
  '983'?: number
  '995'?: number
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
  '426'?: number
  '546'?: number
  '591'?: number
  '592'?: number
  '593'?: number
  '694'?: number
  '894'?: number
  '899'?: number
  '911'?: number
  '916'?: number
  '951'?: number
  '954'?: number
  '961'?: number
  '975'?: number
  '979'?: number
  '986'?: number
  '987'?: number
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

export interface APIMstEquipLimitExslot {
  '100': number[]
  '1000': number[]
  '1001': number[]
  '1006': number[]
  '101': number[]
  '114': number[]
  '200': number[]
  '290': number[]
  '395': number[]
  '511': number[]
  '512': number[]
  '513': number[]
  '516': number[]
  '574': number[]
  '995': number[]
}

export interface APIMstEquipShip {
  '100': The100
  '1000': The100
  '1001': The100
  '1003': The1003
  '1006': The100
  '1008': The100
  '101': The100
  '114': The100
  '131': The131
  '136': The131
  '143': The131
  '146': The100
  '147': The100
  '148': The131
  '166': The166
  '178': The131
  '179': The100
  '180': The100
  '198': The100
  '199': The100
  '200': The100
  '216': The100
  '217': The100
  '260': The100
  '275': The131
  '276': The131
  '290': The100
  '305': The100
  '306': The100
  '307': The100
  '314': The100
  '330': The100
  '343': The100
  '346': The100
  '352': The352
  '356': The100
  '357': The100
  '358': The131
  '361': The131
  '372': The372
  '380': The1003
  '381': The100
  '382': The1003
  '392': The131
  '395': The100
  '411': The372
  '412': The372
  '418': The100
  '419': The100
  '421': The100
  '422': The100
  '423': The100
  '434': The100
  '435': The100
  '445': The131
  '446': The372
  '447': The372
  '450': The131
  '460': The352
  '464': The100
  '466': The466
  '467': The466
  '468': The100
  '469': The100
  '470': The100
  '477': The100
  '478': The100
  '487': The100
  '488': The372
  '489': The100
  '490': The100
  '491': The131
  '496': The372
  '497': The100
  '498': The100
  '500': The131
  '501': The372
  '502': The100
  '506': The131
  '507': The372
  '511': The131
  '512': The131
  '513': The131
  '516': The100
  '521': The521
  '522': The1003
  '526': The100
  '529': The1003
  '530': The530
  '532': The100
  '533': The100
  '534': The100
  '536': The1003
  '537': The100
  '538': The100
  '539': The530
  '541': The372
  '542': The100
  '543': The100
  '546': The131
  '547': The372
  '548': The100
  '553': The131
  '554': The372
  '556': The100
  '559': The100
  '563': The100
  '564': The100
  '566': The100
  '567': The100
  '568': The100
  '569': The100
  '573': The131
  '574': The372
  '578': The100
  '579': The100
  '581': The131
  '586': The372
  '587': The100
  '588': The100
  '591': The131
  '592': The372
  '593': The100
  '605': The530
  '621': The621
  '622': The372
  '623': The100
  '624': The372
  '626': The131
  '628': The100
  '629': The372
  '630': The131
  '634': The621
  '635': The621
  '639': The100
  '640': The100
  '645': The645
  '646': The466
  '647': The100
  '649': The100
  '650': The645
  '651': The100
  '652': The372
  '656': The100
  '657': The131
  '662': The372
  '663': The372
  '666': The100
  '667': The100
  '668': The100
  '670': The100
  '690': The131
  '694': The372
  '699': The100
  '703': The100
  '707': The1003
  '713': The466
  '716': The100
  '717': The100
  '718': The100
  '720': The100
  '724': The131
  '725': The100
  '727': The727
  '731': The530
  '733': The131
  '738': The100
  '739': The372
  '877': The877
  '878': The131
  '879': The100
  '884': The100
  '885': The1003
  '889': The100
  '894': The1003
  '899': The100
  '900': The1003
  '908': The100
  '911': The372
  '915': The131
  '916': The100
  '920': The372
  '927': The131
  '939': The530
  '940': The530
  '943': The1003
  '945': The945
  '948': The100
  '951': The100
  '954': The131
  '955': The100
  '956': The100
  '959': The100
  '960': The100
  '961': The100
  '967': The372
  '968': The100
  '969': The100
  '975': The100
  '979': The372
  '981': The100
  '983': The100
  '986': The100
  '987': The100
  '995': The1003
  '998': The100
  '999': The372
}

export interface The100 {
  api_equip_type: The100_APIEquipType
}

export interface The100_APIEquipType {
  '1'?: number[] | null
  '10'?: null
  '11'?: null
  '12'?: null
  '13'?: number[] | null
  '14'?: null
  '15'?: null
  '16'?: null
  '17': null
  '18'?: null
  '19'?: null
  '2'?: number[] | null
  '20'?: null
  '21': null
  '22'?: null
  '23': null
  '24'?: null
  '25'?: null
  '26'?: null
  '27'?: number[] | null
  '28'?: null
  '29'?: null
  '3'?: null
  '30'?: null
  '33'?: null
  '34'?: null
  '35'?: null
  '36'?: null
  '37'?: null
  '38'?: null
  '39'?: null
  '4'?: number[] | null
  '40'?: null
  '42'?: null
  '43': null
  '44'?: null
  '45'?: null
  '46'?: null
  '5'?: null
  '50'?: null
  '54'?: null
  '6'?: null
  '7'?: null
  '8'?: null
  '9'?: null
  '93'?: null
  '95'?: null
}

export interface The1003 {
  api_equip_type: The1003_APIEquipType
}

export interface The1003_APIEquipType {
  '1'?: number[]
  '12': null
  '13'?: null
  '14'?: null
  '15'?: null
  '16'?: null
  '17': null
  '20': null
  '21': null
  '23': null
  '24'?: null
  '25'?: null
  '26'?: null
  '27'?: number[] | null
  '28'?: null
  '29'?: null
  '30'?: null
  '33'?: null
  '34'?: null
  '35'?: null
  '36'?: null
  '39'?: null
  '4'?: number[] | null
  '40'?: null
  '43': null
  '44'?: null
  '50': null
  '54'?: null
  '6'?: null
  '7'?: null
  '8'?: null
  '9'?: null
  '94'?: null
  '95'?: null
}

export interface The131 {
  api_equip_type: The131_APIEquipType
}

export interface The131_APIEquipType {
  '1'?: null
  '10'?: null
  '11'?: number[] | null
  '12': null
  '13'?: null
  '14'?: null
  '15'?: null
  '16'?: null
  '17': null
  '18'?: null
  '19'?: null
  '2'?: null
  '20': null
  '21': null
  '22'?: null
  '23': null
  '24'?: null
  '25'?: null
  '26'?: null
  '27'?: number[] | null
  '28'?: null
  '29': null
  '3'?: null
  '30'?: null
  '31'?: null
  '33'?: null
  '34': null
  '35'?: null
  '36': null
  '37'?: null
  '38'?: null
  '39': null
  '4'?: null
  '40'?: null
  '41'?: null
  '42'?: null
  '43': null
  '44'?: null
  '45'?: null
  '46'?: null
  '5'?: null
  '50'?: null
  '54'?: null
  '6'?: null
  '7'?: null
  '9'?: null
  '93'?: null
  '95'?: null
}

export interface The166 {
  api_equip_type: The166_APIEquipType
}

export interface The166_APIEquipType {
  '1': null
  '12': null
  '15': null
  '17': null
  '20': null
  '21': null
  '23': null
  '24': null
  '25': null
  '26': null
  '30': null
  '34': null
  '35': number[]
  '36': null
  '37': null
  '4': null
  '40': null
  '43': null
  '46': null
  '50': null
  '6': null
}

export interface The352 {
  api_equip_type: The352_APIEquipType
}

export interface The352_APIEquipType {
  '1': null
  '10': null
  '11': null
  '12': null
  '13'?: null
  '14'?: null
  '17': null
  '20': null
  '21': null
  '23': null
  '24'?: null
  '25': null
  '30': null
  '35': null
  '36': null
  '4': number[]
  '43': null
  '44': null
  '45': null
  '46'?: null
  '8'?: null
}

export interface The372 {
  api_equip_type: The372_APIEquipType
}

export interface The372_APIEquipType {
  '1'?: null
  '10'?: null
  '11'?: null
  '12'?: null
  '13'?: null
  '14'?: null
  '15'?: null
  '16'?: null
  '17': null
  '18'?: null
  '19'?: null
  '2'?: number[] | null
  '20'?: null
  '21': null
  '22'?: null
  '23': null
  '24'?: null
  '25'?: null
  '26'?: null
  '27'?: number[] | null
  '28'?: null
  '29': null
  '3'?: null
  '30'?: null
  '33': null
  '34'?: null
  '35'?: null
  '36'?: null
  '37'?: null
  '38'?: null
  '39': null
  '4'?: number[] | null
  '40'?: null
  '41'?: null
  '42'?: null
  '43': null
  '45'?: null
  '46'?: null
  '5'?: null
  '50'?: null
  '54'?: null
  '6'?: null
  '7'?: null
  '9'?: null
  '93'?: null
  '95'?: null
}

export interface The466 {
  api_equip_type: The466_APIEquipType
}

export interface The466_APIEquipType {
  '12': null
  '13': null
  '14'?: null
  '16': null
  '17': null
  '20': null
  '21': null
  '23': null
  '25'?: null
  '26'?: null
  '28': null
  '34': null
  '35': null
  '36': null
  '4': null
  '40': null
  '43': null
  '50': null
  '56': null
  '57': null
  '58': null
  '59': null
  '6': null
  '7': null
  '8': null
  '9': null
  '94'?: null
  '95': null
}

export interface The521 {
  api_equip_type: The521_APIEquipType
}

export interface The521_APIEquipType {
  '12': null
  '16': null
  '17': null
  '20': null
  '21': null
  '23': null
  '27': null
  '35': null
  '36': null
  '4': null
  '43': null
  '50': null
  '6': null
  '7': null
}

export interface The530 {
  api_equip_type: The530_APIEquipType
}

export interface The530_APIEquipType {
  '14': null
  '17': null
  '21'?: null
  '22'?: null
  '23': null
  '30': null
  '32': null
  '37': null
  '43': null
  '46': null
  '5': null
  '50': null
  '51': null
}

export interface The621 {
  api_equip_type: The621_APIEquipType
}

export interface The621_APIEquipType {
  '1': null
  '10': null
  '12': null
  '15'?: null
  '16'?: null
  '17': null
  '2'?: null
  '20': null
  '21': null
  '23': null
  '24'?: null
  '25'?: null
  '27': null
  '30'?: null
  '33'?: null
  '34': null
  '36'?: null
  '37': null
  '39': null
  '4': null
  '40': null
  '43': null
  '45': null
  '46'?: null
}

export interface The645 {
  api_equip_type: The645_APIEquipType
}

export interface The645_APIEquipType {
  '12': null
  '13': null
  '14': null
  '17': null
  '23': null
  '24': null
  '25'?: null
  '27': null
  '28'?: null
  '29': null
  '30': null
  '34': null
  '35'?: null
  '40'?: null
  '42'?: null
  '43': null
  '44': null
  '50': null
  '54': null
}

export interface The727 {
  api_equip_type: The727_APIEquipType
}

export interface The727_APIEquipType {
  '1': number[]
  '12': null
  '15': null
  '17': null
  '21': null
  '23': null
  '27': null
  '29': null
  '30': null
  '33': null
  '37': null
  '4': number[]
  '43': null
  '46': null
  '50': null
  '52': null
}

export interface The877 {
  api_equip_type: The877_APIEquipType
}

export interface The877_APIEquipType {
  '10': null
  '12': null
  '16': null
  '17': null
  '20': null
  '21': null
  '23': null
  '28': null
  '29': null
  '3': null
  '33': null
  '37': null
  '39': null
  '4': null
  '42': null
  '43': null
  '5': null
  '95': null
}

export interface The945 {
  api_equip_type: The945_APIEquipType
}

export interface The945_APIEquipType {
  '1': number[]
  '15': null
  '17': null
  '21': null
  '23': null
  '30': null
  '37': null
  '43': null
  '46': null
  '50': null
  '52': null
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
  api_sp_flag?: number
  api_version: string[]
  api_weda?: number[]
  api_wedb?: number[]
  api_wedc?: number[]
  api_wedd?: number[]
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
  api_tech_count: number
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
  api_equip_type: APIMstStypeAPIEquipType
  api_id: number
  api_kcnt: number
  api_name: string
  api_scnt: number
  api_sortno: number
}

export interface APIMstStypeAPIEquipType {
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
