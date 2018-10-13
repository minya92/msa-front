<template>
  <main-layout>
    <div class="content-fluid catalog-section">
      <aside>
        <categories />
        <filter-model></filter-model>
      </aside>

      <div>
        <catalog-section sortBlock></catalog-section>
        <!--<catalog-item-list :filter="filter" paginationBlock></catalog-item-list>-->
      </div>
    </div>
    <div class="content-fluid">
      <recent-view></recent-view>
    </div>
    <grey-marks class="container-fluid"></grey-marks>
    <action-blocks class="container-fluid"></action-blocks>
  </main-layout>
</template>

<script>
  import MainLayout from '@/layouts/Main'
  import RecentView from './RecentView'
  import GreyMarks from './GreyMarks'
  import ActionBlocks from './ActionBlocks'
  import Categories from './Categories'
  import FilterModel from '@/components/catalog/Filter'
  import CatalogItemList from '@/components/catalog/CatalogItemList'
  import CatalogSection from '@/components/catalog/CatalogSection'

  export default {
    components: {
      MainLayout,
      RecentView,
      GreyMarks,
      ActionBlocks,
      Categories,
      FilterModel,
      CatalogItemList,
      CatalogSection
    },
    data() {
      return {
        filter: {
          types: '149996868299000',
          cost_min: '',
          cost_max: '',
          mark_model: '151233301690500',
          order: '',
          pageSize: 3
        }
      }
    }
  }
</script>
