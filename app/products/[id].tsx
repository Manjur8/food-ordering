import ViewFood from '@/components/ViewFood'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const ViewFoodRoute = () => {
  return (
    <SafeAreaView className="bg-white h-full">
        <ViewFood />
    </SafeAreaView>
  )
}

export default ViewFoodRoute