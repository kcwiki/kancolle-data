export interface Equipment {
  _aa: boolean | number
  _album_type?: string
  _armor: boolean | number
  _asw: boolean | number
  _asw_damage_type?: string
  _back?: number
  _bombing: boolean | number
  _bonus?: object
  _buildable: boolean
  _can_attack_installations?: boolean
  _card_japanese_name?: string
  _card_localized_name?: boolean
  _card_name?: string
  _card_reading?: string
  _comparison_japanese_name?: string
  _comparison_name?: string
  _comparison_reading?: string
  _evasion: boolean | number
  _firepower: boolean | number
  _flight_cost?: boolean | number
  _flight_range?: boolean | number
  _gun_fit_group?: boolean | null | string
  _icon: number
  _id: number
  _improvements?: boolean | object
  _info?: string
  _item_id?: number
  _japanese_name: string
  _library_japanese_name?: string
  _library_name?: string
  _library_reading?: string
  _list_japanese_name?: string
  _list_name?: string
  _list_reading?: string
  _localized_name?: boolean | string
  _los: boolean | number
  _luck: boolean
  _name: string
  _page?: boolean
  _range: boolean | number
  _rarity: number
  _reading: boolean | null | string
  _scrap_ammo: boolean | number
  _scrap_bauxite: boolean | number
  _scrap_fuel: boolean | number
  _scrap_steel: boolean | number
  _shelling_accuracy: boolean | number
  _special: boolean | string
  _speed: boolean
  _stars?: number
  _torpedo: boolean | number
  _torpedo_accuracy: boolean | number
  _type: number
  _types?: number[]
  _version?: number
  _wikipedia?: string
}
