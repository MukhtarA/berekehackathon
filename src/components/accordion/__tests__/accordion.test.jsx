import React from 'react'
import { mount } from 'enzyme'

import { Accordion, AccordionItem, AccordionSummary, AccordionContent } from '..'

describe('<Accordion>', () => {
    it('Проверка отрисовки с условным рендерингом', () => {
        const data = false
        const component = mount(
            <Accordion size="h3">
                <AccordionItem id="1" aria-level="1">
                    <AccordionSummary title="Title h3" />
                    <AccordionContent>
                        Целевая аудитория по-прежнему востребована. Диктат потребителя конкурентоспособен. Российская специфика обуславливает потребительский рынок
                    </AccordionContent>
                </AccordionItem>
                {data && (
                    <AccordionItem id="3" aria-level="3">
                        <AccordionSummary title="Title h3" description="Контент монтируется при разворачивании и размонтируется при сворачивании" />
                        <AccordionContent>
                            Просто текст
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>
        )

        expect(component).toMatchSnapshot()
    })
})
